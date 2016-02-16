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
      :host => 'localhost',
      :port => 8080,
      :app_id => '4',
      :client_access_token => 'b55a10860022b0cc',
      :server_access_token => '9eb7696d6ff7a032'
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
