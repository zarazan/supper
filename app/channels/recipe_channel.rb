class RecipeChannel < ApplicationCable::Channel
  def subscribed
    stream_from "recipe_channel"
  end

  def unsubscribed
  end
end
