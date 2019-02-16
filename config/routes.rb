Rails.application.routes.draw do
  namespace :api do
    post 'authenticate', to: 'authentication#authenticate'

    resources :users, only: [:index]
  end
end
