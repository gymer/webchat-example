class MessageSerializer < ActiveModel::Serializer
  attributes :id, :dialog_id, :user_id, :text, :created_at
end
