class DialogSerializer < ActiveModel::Serializer
  attributes :id, :name, :last_read
  has_many :messages
  has_many :members

  def members
    object.members.where.not(user_id: scope.current_user.id)
  end

  def last_read
    user = object.members.find_by(user: scope.current_user)
    user.last_read
  end
end
