class Api::MessagesController < ApplicationController
  before_action :set_dialog, only: [:create]

  def index
    messages = Message.where(dialog_id: params[:dialog_id])
    render json: messages
  end

  def create
    message = @dialog.messages.new(message_params)
    message.user_id = current_user.id

    if message.save
      render json: message
    else
      render json: message.errors, status: 400
    end
  end

  def show
  end

  private

  def set_dialog
    @dialog = Dialog.find(params[:dialog_id])
  end

  def message_params
    params.permit(:text)
  end
end
