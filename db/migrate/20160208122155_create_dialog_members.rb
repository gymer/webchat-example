class CreateDialogMembers < ActiveRecord::Migration
  def change
    create_table :dialog_members do |t|
      t.references :user, index: true, foreign_key: true
      t.references :dialog, index: true, foreign_key: true
      t.boolean :hidden, null: false, default: false

      t.timestamps null: false
    end
  end
end
