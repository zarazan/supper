class CreateRecipes < ActiveRecord::Migration[8.0]
  def change
    create_table :recipes do |t|
      t.string :name, null: false
      t.string :description
      t.text :instructions
      t.timestamps
    end
  end
end
