module Api
  class UsersController < ApplicationController
    skip_before_action :authenticate_request, only: [:index]
    def index
      users = User.all
      render json: { apiOK: true, msg: 'Loaded Users', data: users }, status: :ok
    end
  end
end