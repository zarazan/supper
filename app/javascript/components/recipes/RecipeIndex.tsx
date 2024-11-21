import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchRecipes } from '../../store/recipesSlice'
import { Link } from 'react-router-dom';

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
      <Link to="/recipes/new" className="bg-blue-500 text-white px-4 py-2 rounded mt-2">New Recipe</Link>
      <table className="table-auto w-full mt-4">
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
              <td>
                <Link 
                  to={`/recipes/${recipe.id}/edit`} 
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default RecipeTable
