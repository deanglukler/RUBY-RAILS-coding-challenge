# frozen_string_literal: true

# guide: https://www.pluralsight.com/guides/token-based-authentication-with-ruby-on-rails-5-api
class AuthenticateUser
  prepend SimpleCommand

  def initialize(email, password)
    @email = email
    @password = password
  end

  def call
    JsonWebToken.encode(user_id: user.id) if user
  end

  private

  attr_accessor :email, :password

  def user
    user = User.find_by_email(email)

    # This method (authenticate) can be available by putting has_secure_password
    # in the User model to check if the user's password is correct
    return user if user&.authenticate(password)

    errors.add :user_authentication, 'invalid credentials'
    nil
  end
end
