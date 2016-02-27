class Api::DialogsController < Api::ApplicationController
  def index
    dialogs = current_user.dialogs.includes(:members)
    render json: dialogs
  end

  def show
    dialog = Dialog.includes(:messages).find(params[:id])
    render json: dialog
  end

  def create
    dialog = Dialog.new(dialog_params)
    dialog.members.build(user_id: current_user.id)

    if dialog.save
      render json: dialog
    else
      render json: dialog.errors, status: 400
    end
  end

  private

  def dialog_params
    params.permit(:name, members_attributes: [:id, :user_id, :hidden])
  end
end
