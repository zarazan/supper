import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchRecipes } from '../store/recipesSlice'

const RecipeTable: React.FC = () => {
  const dispatch = useAppDispatch()
  const { items: recipes, status, error } = useAppSelector((state) => state.recipes)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRecipes())
    }
  }, [dispatch])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Recipe Name</th>
            <th>Ingredients</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => (
            <tr key={recipe.id}>
              <td>{recipe.name}</td>
              <td>
                {recipe.ingredients?.map((ingredient) => (
                  <span key={ingredient.id}>{ingredient.food_name}</span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RecipeTable
