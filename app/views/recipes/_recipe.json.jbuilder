json.extract! recipe, :id, :name, :description, :instructions, :created_at, :updated_at

json.ingredients recipe.ingredients do |ingredient|
  json.extract! ingredient, :id, :food_id, :measurement, :created_at, :updated_at
  json.food_name ingredient.food.name
end
