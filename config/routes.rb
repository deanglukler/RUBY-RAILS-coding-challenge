# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    post 'authenticate', to: 'authentication#authenticate'

    resources :users, only: [:index]

    resources :shifts, except: [:edit, :show]

    patch '/shifts/:id/employee', to: 'shifts#employee_update'
  end
end
