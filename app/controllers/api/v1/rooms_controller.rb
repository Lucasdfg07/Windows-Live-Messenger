class Api::V1::RoomsController < ApplicationController
  def create
    begin
      @room = Room.create!
      @room.generate_user_rooms(params[:users])

      render json: { status: 200, message: "Entrou na sala com sucesso!" }
    rescue => exception
        render json: { status: 500, message: "#{exception}." }
    end
  end
end
