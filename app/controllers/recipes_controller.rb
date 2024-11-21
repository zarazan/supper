class RecipesController < ApplicationController

  def index
    @recipes = Recipe.all.preload(ingredients: :food)
  end

  def create
    @recipe = Recipe.new(recipe_params)
    if @recipe.save
      render :create, status: :created
    else
      render :errors, status: :unprocessable_entity
    end
  end

  def update
    @recipe = Recipe.find(params[:id])
    if @recipe.update(recipe_params)
      render :create, status: :ok
    else
      render :errors, status: :unprocessable_entity
    end
  end

  private

  def recipe_params
    params.require(:recipe).permit(:name, :description, ingredients_attributes: [:id, :food_id, :measurement, :_destroy])
  end

end
