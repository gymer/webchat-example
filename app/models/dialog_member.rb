class DialogMember < ActiveRecord::Base
  belongs_to :user
  belongs_to :dialog
end
