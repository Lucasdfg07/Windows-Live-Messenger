class UserRoom < ApplicationRecord
  belongs_to :user
  belongs_to :room

  def self.find_room_of_users(user, partner)
    user_array = self.user_room_array_of_user(user)
    partner_array = self.user_room_array_of_user(partner)

    (user_array & partner_array).first # Return Room Id
  end

  private

  def self.user_room_array_of_user(id)
    UserRoom.where('user_id = ?', id).pluck(:room_id)
  end
end
