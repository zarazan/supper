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

  def show
    @recipe = Recipe.find(params[:id])
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
    rp = params.require(:recipe).permit(
      :name,
      :description,
      :instructions,
      ingredients_attributes: [:id, :food_id, :food_name, :measurement, :_destroy]
    )
    create_new_foods(rp)
  end

  def create_new_foods(rp)
    rp[:ingredients_attributes].each do |ingredient|
      food_name = ingredient.delete(:food_name)
      if ingredient[:food_id].blank? || ingredient[:food_id] == 0
        food = Food.find_or_initialize_by(name: food_name)
        ingredient[:food_id] = food.id if food.persisted? || food.save
      end
    end
    rp
  end

end
