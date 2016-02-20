class Api::MessagesController < ApplicationController
  before_action :set_dialog, only: [:create]

  def index
    messages = Message.where(dialog_id: params[:dialog_id])
    render json: messages
  end

  def create
    message = @dialog.messages.new(message_params)
    message.user_id = current_user.id
    members = @dialog.members.where.not({ user_id: current_user.id })

    @client = Gymer::Client.new({
      :host => 'staging.api.gymmer.ru',
      :app_id => '1',
      :client_access_token => '62b46ef8a1f8e574',
      :server_access_token => '9ea9485d2a7e8069'
    })

    if message.save
      members.each do |member|
        @client.push("chat_#{member.user_id}", 'new_message', message.attributes)
      end
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
