json.array! @recipes do |recipe|
  json.extract! recipe, *recipe.attribute_names.map(&:to_sym)

  json.ingredients recipe.ingredients do |ingredient|
    json.extract! ingredient, *ingredient.attribute_names.map(&:to_sym)
  end
end
