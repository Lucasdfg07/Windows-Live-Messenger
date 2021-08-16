class Room < ApplicationRecord
  has_many :user_rooms
  has_many :users, through: :user_rooms

  def generate_user_rooms(users)
    unless UserRoom.find_room_of_users(users[0], users[1]).present?
      users.each do |user_id|
        UserRoom.find_or_create_by(room_id: self.id, user_id: user_id)
      end
    end
  end
end
