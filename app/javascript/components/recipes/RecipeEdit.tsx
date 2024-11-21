import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateRecipe } from '../../store/recipesSlice';
import { RecipeFormData } from './RecipeNew';
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

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <RecipeForm
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      submitButtonText="Update Recipe"
    />
  );
};

export default EditRecipeForm;
