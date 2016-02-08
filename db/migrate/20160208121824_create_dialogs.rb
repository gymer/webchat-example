class CreateDialogs < ActiveRecord::Migration
  def change
    create_table :dialogs do |t|
      t.string :name

      t.timestamps null: false
    end
  end
end
