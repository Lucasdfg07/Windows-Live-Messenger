Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'rooms/show'
    end
  end
  devise_for :users
  root "home#index"

  namespace :api, :defaults => { :format => 'json' } do
    namespace :v1 do
      resources :users, only: [:index, :update]
      post 'users/sign_in', to: 'users#sign_in'
      post 'users/sign_up', to: 'users#sign_up'

      resources :user_rooms, only: [:create]
      get 'user_rooms/find_chat_user', to: 'user_rooms#find_chat_user'

      resources :rooms, only: [:create]
    end
  end
end
