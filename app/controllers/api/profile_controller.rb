class Api::ProfileController < Api::ApplicationController
  def index
    render json: current_user
  end
end
