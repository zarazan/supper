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

type IngredientField = 'food_id' | 'food_name' | 'measurement';

const WarningIcon = () => (
  <svg 
    className="w-5 h-5 text-amber-500" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
    />
  </svg>
);

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

  const handleIngredientChange = (index: number, field: IngredientField, value: string | number) => {
    const newIngredients = [...formData.ingredients_attributes];
    newIngredients[index] = {
      id: newIngredients[index]?.id || undefined,
      food_id: newIngredients[index]?.food_id || 0,
      food_name: newIngredients[index]?.food_name || '',
      measurement: newIngredients[index]?.measurement || '',
      [field]: value
    };
    setFormData({
      ...formData,
      ingredients_attributes: newIngredients
    });
  };

  const getFoodSuggestions = (searchTerm: string) => {
    const normalizedTerm = searchTerm?.toLowerCase().trim() || '';
    const hasExactMatch = foods.some(f => f.name.toLowerCase() === normalizedTerm);
    if (hasExactMatch) return [];
    
    return foods
      .filter(food => food.name.toLowerCase().includes(normalizedTerm))
      .map((food) => (
        <option key={food.id} value={food.name} />
      ));
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
            
            <div className="relative">
              <input
                type="text"
                value={ingredient.food_name}
                onChange={(e) => {
                  const searchTerm = e.target.value.toLowerCase();
                  const matchedFood = foods.find(f => f.name.toLowerCase() === searchTerm);

                  const updatedIngredient = {
                    ...ingredient,
                    food_name: e.target.value,
                    food_id: matchedFood ? matchedFood.id : 0
                  };

                  const newIngredients = [...formData.ingredients_attributes];
                  newIngredients[index] = updatedIngredient;

                  setFormData({
                    ...formData,
                    ingredients_attributes: newIngredients
                  });
                }}
                list={`foods-list-${index}`}
                className={`p-2 border rounded ${!ingredient.food_id ? 'border-red-500 bg-red-50' : ''}`}
                placeholder="Type food name..."
              />
              {!ingredient.food_id && ingredient.food_name && (
                <div className="relative float-right -ml-10 pr-2 pt-3 group">
                  <WarningIcon />
                  <div className="absolute left-6 top-0 w-48 p-2 bg-amber-100 text-amber-700 text-sm rounded shadow-lg invisible group-hover:visible">
                    This will create a new food type. Please try to select a food from the suggestions.
                  </div>
                </div>
              )}
              <datalist id={`foods-list-${index}`}>
                {getFoodSuggestions(ingredient.food_name || '')}
              </datalist>
            </div>

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
