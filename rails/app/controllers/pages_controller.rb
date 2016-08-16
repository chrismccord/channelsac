class PagesController < ApplicationController
  def show
  end

  def gc
    GC.start
    GC.start
    GC.start
    render json: JSON.dump(GC.stat)
  end
end
