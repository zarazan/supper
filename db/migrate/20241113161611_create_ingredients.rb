class CreateIngredients < ActiveRecord::Migration[8.0]
  def change
    create_table :ingredients do |t|
      t.references :recipe, foreign_key: true, null: false
      t.references :food, foreign_key: true, null: false
      t.string :measurement
      t.timestamps
    end
  end
end
