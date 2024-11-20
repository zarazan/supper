import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createRecipe } from '../store/recipesSlice';
import { Ingredient } from '../types/types';

const getCsrfToken = (): string => {
  const element = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement;
  return element ? element.content : '';
};

export interface RecipeFormData {
  name: string;
  description: string;
  ingredients_attributes: Ingredient[];
}

const NewRecipeForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: foods } = useAppSelector((state) => state.foods);
  const csrfToken = getCsrfToken();
  
  const [formData, setFormData] = useState<RecipeFormData>({
    name: '',
    description: '',
    ingredients_attributes: []
  });

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients_attributes: [
        ...formData.ingredients_attributes,
        { food_id: 0, measurement: '' }
      ]
    });
  };

  const handleIngredientChange = (index: number, field: keyof Ingredient, value: string | number) => {
    const newIngredients = [...formData.ingredients_attributes];
    newIngredients[index] = {
      food_id: newIngredients[index]?.food_id || 0,
      measurement: newIngredients[index]?.measurement || '',
      [field]: value
    };
    setFormData({
      ...formData,
      ingredients_attributes: newIngredients
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createRecipe({ 
      data: formData,
      csrfToken 
    }))
    .unwrap()
    .then(() => {
      setFormData({
        name: '',
        description: '',
        ingredients_attributes: []
      });
    })
    .catch((error: Error) => {
      alert('Failed to create recipe: ' + error.message);
    });
  };
  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4">
      <div className="mb-4">
        <label className="block mb-2">Recipe Name:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Description:</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <h3 className="mb-2">Ingredients</h3>
        {formData.ingredients_attributes.map((ingredient, index) => (
          <div key={index} className="flex gap-4 mb-2">
            <select
              value={ingredient.food_id}
              onChange={(e) => handleIngredientChange(index, 'food_id', parseInt(e.target.value))}
              className="p-2 border rounded"
            >
              <option value="">Select Food</option>
              {foods.map((food) => (
                <option key={food.id} value={food.id}>{food.name}</option>
              ))}
            </select>

            <input
              type="text"
              value={ingredient.measurement}
              onChange={(e) => handleIngredientChange(index, 'measurement', e.target.value)}
              placeholder="Measurement"
              className="p-2 border rounded w-24"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addIngredient}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Add Ingredient
        </button>
      </div>

      <button
        type="submit"
        className="bg-green-500 text-white px-6 py-2 rounded"
      >
        Create Recipe
      </button>
    </form>
  );
};

export default NewRecipeForm;
