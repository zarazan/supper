class MealPlansController < ApplicationController

  def create
    @meal_plan = MealPlan.new(meal_plan_params)
    
    if @meal_plan.save
      render json: @meal_plan, status: :created
    else
      render json: @meal_plan.errors, status: :unprocessable_entity
    end
  end

  def show
    @meal_plan = MealPlan.find(params[:id])
  end

  def add_recipe
    @meal_plan = MealPlan.find(params[:id])
    @recipe = Recipe.find(params[:recipe_id])
    
    if @meal_plan.recipes << @recipe
      render json: @meal_plan, status: :ok
    else
      render json: { error: "Could not add recipe to meal plan" }, status: :unprocessable_entity
    end
  end

  def remove_recipe
    @meal_plan = MealPlan.find(params[:id])
    @recipe = Recipe.find(params[:recipe_id])
    
    if @meal_plan.recipes.delete(@recipe)
      render json: @meal_plan, status: :ok
    else
      render json: { error: "Could not remove recipe from meal plan" }, status: :unprocessable_entity
    end
  end

  private

  def meal_plan_params
    params.require(:meal_plan).permit(:name)
  end
end
