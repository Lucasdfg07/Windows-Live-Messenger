class Api::V1::UserRoomsController < ApplicationController
    def create
        @room = Room.create
        
        @user_room = UserRoom.new(user_rooms_params)
        @user_room.room_id = @room.id

        begin
            @user_room.save!
            render json: { status: 200, message: "Entrou na sala com sucesso!" }
        rescue => exception
            render json: { status: 500, message: "#{exception}." }
        end
    end
    
    private

    def user_rooms_params
        params.require(:user_room).permit(:user_id)
    end
end
