class RecipesController < ApplicationController

  def index
    @recipes = Recipe.all.preload(:ingredients)
  end

end
