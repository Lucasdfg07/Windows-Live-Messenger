class Message < ApplicationRecord
  belongs_to :room
  belongs_to :user

  after_commit { ActionCable.server.broadcast('chat_channel', self) }
end
