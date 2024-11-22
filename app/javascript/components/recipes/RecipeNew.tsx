import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { createRecipe } from '../../store/recipesSlice';
import { fetchFoods } from '../../store/foodsSlice';
import useCsrfToken from '../../hooks/useCsrfToken';
import { useNavigate } from 'react-router-dom';
import RecipeForm from './RecipeForm';
import { RecipeFormData } from './RecipeForm';

const NewRecipeForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const csrfToken = useCsrfToken();
  const navigate = useNavigate();
  
  useEffect(() => {
    clearForm();
    dispatch(fetchFoods());
  }, [dispatch]);

  const [formData, setFormData] = useState<RecipeFormData>({
    name: '',
    description: '',
    ingredients_attributes: []
  });
  
  const clearForm = () => {
    setFormData({
      name: '',
      description: '',
      ingredients_attributes: []
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
      navigate('/recipes');
    })
    .catch((error: Error) => {
      alert('Failed to create recipe: ' + error.message);
    });
  };

  return (
    <RecipeForm
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      submitButtonText="Create Recipe"
    />
  );
};

export default NewRecipeForm;
