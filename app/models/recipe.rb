class Recipe < ApplicationRecord
  has_many :ingredients, dependent: :destroy

  accepts_nested_attributes_for :ingredients, allow_destroy: true

  validates :name, presence: true

  after_save :broadcast_recipe

  def to_json
    ApplicationController.new.view_context.render(
      partial: "recipes/recipe",
      locals: { recipe: self },
      formats: [:json],
      handlers: [:jbuilder]
    )
  end

  private

  def broadcast_recipe
    ActionCable.server.broadcast 'recipe_channel', { type: 'RECIPE_UPDATED', recipe: self.to_json }
  end
end
