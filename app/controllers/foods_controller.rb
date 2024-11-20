class FoodsController < ApplicationController

  def index
    @foods = Food.order(:name)
  end

end
