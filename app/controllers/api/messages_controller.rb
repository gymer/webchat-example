class Api::MessagesController < ApplicationController
  before_action :set_dialog, only: [:create]

  def index
    messages = Message.where(dialog_id: params[:dialog_id])
    render json: messages
  end

  def create
    byebug
  end

  def show
  end

  private

  def set_dialog
    @dialog = Dialog.find(params[:dialog_id])
  end
end
