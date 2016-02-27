class Api::MessagesController < Api::ApplicationController
  before_action :set_dialog, only: [:index, :create]

  def index
    messages = @dialog.messages
    @dialog.members.find_by(user: current_user).update(last_read: messages.last.id) unless messages.empty?

    render json: messages
  end

  def create
    message = @dialog.messages.new(message_params)
    message.user_id = current_user.id
    members = @dialog.members.where.not({ user_id: current_user.id })

    @client = Gymer::Client.new

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
