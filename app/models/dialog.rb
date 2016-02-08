class Dialog < ActiveRecord::Base
  has_many :members, class_name: 'DialogMember', :dependent => :destroy
  has_many :messages, :dependent => :destroy

  accepts_nested_attributes_for :members
end
