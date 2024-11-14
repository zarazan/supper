require "faker"
require "humanize"

100.times.each do
  Food.create!(name: Faker::Food.unique.ingredient)
end

20.times.each do
  recipe = Recipe.create!(name: Faker::Food.unique.dish)

  Random.new.rand(3..8).times.each do
    quantity = Random.new.rand(0..3)
    measurement = quantity == 0 ? Faker::Food.measurement : quantity.humanize
    Ingredient.create!(
      recipe: recipe,
      food: Food.order("RANDOM()").limit(1).first,
      measurement: measurement
    )
  end
end
