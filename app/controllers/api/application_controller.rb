class Api::ApplicationController < ActionController::Base
  include ActionController::MimeResponds

  before_filter :authenticate_user!

  respond_to :json
end
