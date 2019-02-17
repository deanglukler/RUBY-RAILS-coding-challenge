# frozen_string_literal: true

class ApplicationController < ActionController::API
  before_action :authenticate_request
  attr_reader :current_user

  private

  def authenticate_request
    # The request results are returned to the @current_user,
    # thus becoming available to all controllers inheriting from ApplicationController
    # Calling result on AuthorizeApiRequest.call(request.headers) is coming from
    # SimpleCommand module where it is defined as attr_reader :result
    @current_user = AuthorizeApiRequest.call(request.headers).result
    render json: { error: 'Not Authorized' }, status: 401 unless @current_user
  end
end
