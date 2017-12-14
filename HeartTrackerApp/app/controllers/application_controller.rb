class ApplicationController < ActionController::API
  # give access to token creation
  include ActionController::HttpAuthentication::Token::ControllerMethods
end
