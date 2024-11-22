import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { Ingredient } from '../../types/types';

export interface RecipeFormData {
  name: string;
  description: string;
  ingredients_attributes: Ingredient[];
}

interface RecipeFormProps {
  formData: RecipeFormData;
  setFormData: (data: RecipeFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitButtonText: string;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ formData, setFormData, onSubmit, submitButtonText }) => {
  const { items: foods } = useAppSelector((state) => state.foods);

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients_attributes: [
        ...formData.ingredients_attributes,
        { food_id: 0, measurement: '' }
      ]
    });
  };

  const deleteIngredient = (indexToDelete: number) => {
    setFormData({
      ...formData,
      ingredients_attributes: formData.ingredients_attributes
        .map((ingredient, index) => {
          if (index === indexToDelete) {
            if (ingredient.id) {
              return { ...ingredient, _destroy: true };
            }
            return null;
          }
          return ingredient;
        })
        .filter((ingredient): ingredient is Ingredient => 
          ingredient !== null
        )
    });
  };

  const handleIngredientChange = (index: number, field: 'food_id' | 'measurement', value: string | number) => {
    const newIngredients = [...formData.ingredients_attributes];
    newIngredients[index] = {
      id: newIngredients[index]?.id || undefined,
      food_id: newIngredients[index]?.food_id || 0,
      measurement: newIngredients[index]?.measurement || '',
      [field]: value
    };
    setFormData({
      ...formData,
      ingredients_attributes: newIngredients
    });
  };

  return (
    <form onSubmit={onSubmit} className="max-w-2xl mx-auto p-4">
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
          value={formData.description || ''}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <h3 className="mb-2">Ingredients</h3>
        {formData.ingredients_attributes.map((ingredient, index) => (
          <div key={index} className={`flex gap-4 mb-2 ${ingredient._destroy && 'hidden'}`}>
            <select
              value={ingredient.food_id || ''}
              onChange={(e) => handleIngredientChange(index, 'food_id', parseInt(e.target.value))}
              className="p-2 border rounded"
            >
              <option value="">Select Food</option>
              {foods.map((food) => (
                <option 
                  key={food.id} 
                  value={food.id}
                >
                  {food.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              value={ingredient.measurement}
              onChange={(e) => handleIngredientChange(index, 'measurement', e.target.value)}
              placeholder="Measurement"
              className="p-2 border rounded min-w-52"
            />

            <button
              type="button"
              onClick={() => deleteIngredient(index)}
              className="bg-red-500 text-white px-3 py-2 rounded"
            >
              Delete
            </button>
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
        {submitButtonText}
      </button>
    </form>
  );
};

export default RecipeForm;
