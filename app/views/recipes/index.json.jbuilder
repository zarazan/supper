json.array! @recipes do |recipe|
  json.id recipe.id
  json.name recipe.name

  json.ingredients recipe.ingredients do |ingredient|
    json.id ingredient.id
    json.food_name ingredient.food.name
    json.mesaurement ingredient.measurement
  end
end
