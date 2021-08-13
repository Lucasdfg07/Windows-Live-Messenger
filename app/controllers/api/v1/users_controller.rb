class Api::V1::UsersController < ApplicationController
    def index
        @online = User.all
                    .where.not(status: [3, 4])
                    .where.not(id: params['id'].to_i)

        @offline = User.all.where(status: [3, 4])
    end

    def update
        begin
            @user.update!(user_params)
            render json: { status: 200, user: @user, message: "Dados alterados com sucesso!" }
        rescue => exception
            render json: { status: 500, message: "#{exception}." }
        end
    end

    def sign_in
        @user = User.find_by(email: params[:email])

        if  @user.present? && 
            @user.valid_password?(params[:password]) && 
            @user.update(status: params[:status])

            render json: { status: 200, user: @user, message: "Autenticado com sucesso!" }
        else
            render json: { status: 402, message: "Email ou senha inválidos!" }
        end
    end

    def sign_up
        @user = User.new(user_params)

        begin
            @user.save!
            render json: { status: 200, user: @user, message: "Conta cadastrada com sucesso!" }
        rescue => exception
            render json: { status: 500, message: "#{exception}." }
        end
    end

    private

    def set_user
        @user = User.find(params[:id])
    end

    def user_params
        params.require(:user).permit(:name, :email, :photo, :description, :password)
    end
end
