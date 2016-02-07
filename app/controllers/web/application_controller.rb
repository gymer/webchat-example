class Web::ApplicationController < ActionController::Base
  layout 'application'

  protect_from_forgery with: :exception
  before_filter :authenticate_user!
end
