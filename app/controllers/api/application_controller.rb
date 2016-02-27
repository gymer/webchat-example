class Api::ApplicationController < ActionController::Base
  include ActionController::MimeResponds

  before_filter :authenticate_user!
  serialization_scope :view_context

  respond_to :json
end
