class RecipesController < ApplicationController

  def index
    @recipes = Recipe.all.preload(ingredients: :food)
  end

end
