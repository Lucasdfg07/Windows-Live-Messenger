class Message < ApplicationRecord
  belongs_to :room
  belongs_to :user

  after_commit { ActionCable.server.broadcast('chat_channel', message_attributes) }

  private

  def message_attributes
    {
      "user": self.user,
      "message": self,
      "partner": self.room.users.where.not(id: self.user_id).first
    }
  end
end
