class DialogSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :members
  has_many :messages
end
