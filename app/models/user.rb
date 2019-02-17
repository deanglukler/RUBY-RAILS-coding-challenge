# frozen_string_literal: true

class User < ApplicationRecord
  has_many :shifts

  validates :name, presence: true
  validates :email, uniqueness: true
  validates :role, inclusion: 1..2

  has_secure_password
end
