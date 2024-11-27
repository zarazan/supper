class CreateMealPlan < ActiveRecord::Migration[8.0]
  def change
    create_table :meal_plans do |t|
      t.name :string
      t.timestamps
    end
  end
end
