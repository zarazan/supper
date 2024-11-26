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

  def destroy
    @recipe = Recipe.find(params[:id])
    if @recipe.destroy
      render :create, status: :ok
    else
      render :errors, status: :unprocessable_entity
    end
  end

  private

  def recipe_params
    rp = params.require(:recipe).permit(:name, :description, ingredients_attributes: [:id, :food_id, :food_name, :measurement, :_destroy])
    rp[:ingredients_attributes].each do |ingredient|
      food_name = ingredient.delete(:food_name)
      if ingredient[:food_id].blank? || ingredient[:food_id] == 0
        new_food = Food.new(name: food_name)
        ingredient[:food_id] = new_food.id if new_food.save
      end
    end
    rp
  end

end
