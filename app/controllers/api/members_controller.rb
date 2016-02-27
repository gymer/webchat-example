class Api::MembersController < Api::ApplicationController
  before_action :set_dialog, only: [:create]

  def create
    if (@dialog.members.exists?(member_params))
      render json: {error: 'User already is a member.'}, status: 400
      return
    end

    member = @dialog.members.new(member_params)

    if member.save
      render json: member
    else
      render json: member.errors, status: 400
    end
  end

  private

  def set_dialog
    @dialog = Dialog.find(params[:dialog_id])
  end

  def member_params
    params.permit(:user_id)
  end
end
