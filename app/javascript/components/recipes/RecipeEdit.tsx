import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateRecipe, deleteRecipe } from '../../store/recipesSlice';
import { RecipeFormData } from './RecipeForm';
import useCsrfToken from '../../hooks/useCsrfToken';
import { useNavigate, useParams } from 'react-router-dom';
import RecipeForm from './RecipeForm';
import { fetchFoods } from '../../store/foodsSlice';

const EditRecipeForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const csrfToken = useCsrfToken();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const recipe = useAppSelector(state => 
    state.recipes.items.find(recipe => recipe.id === Number(id))
  );

  const [formData, setFormData] = useState<RecipeFormData>({
    name: '',
    description: '',
    ingredients_attributes: []
  });

  useEffect(() => {
    dispatch(fetchFoods());
    
    if (recipe) {
      setFormData({
        name: recipe.name,
        description: recipe.description,
        ingredients_attributes: recipe.ingredients
      });
    }
  }, [dispatch, recipe]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateRecipe({ 
      id: Number(id),
      data: formData,
      csrfToken
    }))
    .unwrap()
    .then(() => {
      navigate('/recipes');
    })
    .catch((error: Error) => {
      alert('Failed to update recipe: ' + error.message);
    });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe? This action cannot be undone.')) {
      dispatch(deleteRecipe({ 
        id: Number(id),
        csrfToken 
      }))
      .unwrap()
      .then(() => {
        navigate('/recipes');
      })
      .catch((error: Error) => {
        alert('Failed to delete recipe: ' + error.message);
      });
    }
  };

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Edit Recipe</h2>
      <RecipeForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        submitButtonText="Update Recipe"
      />
      <div className="mt-6 border-t pt-6">
        <button
          onClick={handleDelete}
          className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete Recipe
        </button>
      </div>
    </div>
  );
};

export default EditRecipeForm;
