import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchRecipes } from '../store/recipesSlice';
import { Link } from 'react-router-dom';

function Search(): React.ReactElement {
  const dispatch = useAppDispatch();
  const { items: recipes, status } = useAppSelector((state) => state.recipes);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRecipes());
    }
  }, [dispatch, status]);

  useEffect(() => {
    const filtered = recipes.filter(recipe => 
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.some(ingredient => 
        ingredient.food_name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredRecipes(filtered);
  }, [searchTerm, recipes]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Search Recipes</h2>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by recipe name, description, or ingredients..."
            className="w-full p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {status === 'loading' ? (
        <div className="text-center py-8">Loading recipes...</div>
      ) : (
        <div className="grid gap-6">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{recipe.name}</h3>
              {recipe.description && (
                <p className="text-gray-600 mb-4">{recipe.description}</p>
              )}
              <div className="mb-4">
                <h4 className="font-medium mb-2">Ingredients:</h4>
                <ul className="list-disc list-inside">
                  {recipe.ingredients.map((ingredient) => (
                    <li key={ingredient.id} className="text-gray-700">
                      {ingredient.measurement} {ingredient.food_name}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                to={`/recipes/${recipe.id}/edit`}
                className="text-blue-500 hover:text-blue-700 font-medium"
              >
                View Recipe →
              </Link>
            </div>
          ))}
          {filteredRecipes.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No recipes found matching your search.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
