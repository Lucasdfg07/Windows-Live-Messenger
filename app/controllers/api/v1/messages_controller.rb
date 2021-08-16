class Api::V1::MessagesController < ApplicationController
  before_action :set_room

  def index
    render json: @room.messages
  end

  def create
    begin
      @message = Message.new
      @message.user_id = params[:user]
      @message.content = params[:content]
      @message.room_id = @room.id
      
      @message.save!

      render json: { status: 200, object: @message, message: "Mensagem Enviada com sucesso!" }
    rescue => exception
        render json: { status: 500, message: "#{exception}." }
    end
  end

  private

  def set_room
    room_id = UserRoom.find_room_of_users(params[:user].to_i, params[:partner].to_i)
    @room = Room.find(room_id)
  end
end
