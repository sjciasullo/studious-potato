class User < ApplicationRecord
  USERNAME_LENGTH = (5..15)
  # ensures uniequeness of username
  validates_uniqueness_of :username
  validates :username, length: USERNAME_LENGTH
  
  #handles password hashing and saves a password as password_digest
  has_secure_password
  has_secure_token :auth_token

  def invalidate_token
    self.update_columns(auth_token: nil)
  end

  def self.validate_login(username, password)
    user = find_by(username: username)
    if user && user.authenticate(password)
      user
    end
  end

end
