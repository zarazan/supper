json.array! @foods.each do |food|
  json.id food.id
  json.name food.name
end
