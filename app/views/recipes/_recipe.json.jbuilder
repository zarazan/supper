json.extract! recipe, :id, :name

json.ingredients recipe.ingredients do |ingredient|
  json.extract! ingredient, :id, :measurement
  json.food_name ingredient.food.name
end
