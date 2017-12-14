class User < ApplicationRecord
  # ensures uniequeness of username
  validates_uniqueness_of :username
  #handles password hashing
  has_secure_password
end
