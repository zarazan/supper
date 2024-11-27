class CreateMealPlansRecipes < ActiveRecord::Migration[8.0]
  def change
    create_join_table :meal_plans, :recipes do |t|
      t.integer :quantity
      t.index :recipe_id
      t.index :meal_plan_id
    end
  end
end
