class AddLastReadToDialogMembers < ActiveRecord::Migration
  def change
    add_column :dialog_members, :last_read, :integer
  end
end
