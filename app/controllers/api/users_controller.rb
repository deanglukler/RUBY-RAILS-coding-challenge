module Api
  class UsersController < ApplicationController
    skip_before_action :authenticate_request, only: [:index]
    def index
      users = User.all
      # TODO: map users and only return name, boss want high security..
      render json: { apiOk: true, msg: 'Loaded Users', data: users },
             status: :ok
    end

    def show
      render json: { apiOk: true, msg: 'Loaded Current User', data: @current_user },
             status: :ok
    end
  end
end
