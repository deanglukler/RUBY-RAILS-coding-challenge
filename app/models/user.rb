class User < ApplicationRecord
  validates :name, presence: true
  validates :email, uniqueness: true
  validates :role, :inclusion => 1..2
  has_secure_password
end
