class Message < ActiveRecord::Base
  belongs_to :user
  belongs_to :dialog

  validates :text, presence: true
end
