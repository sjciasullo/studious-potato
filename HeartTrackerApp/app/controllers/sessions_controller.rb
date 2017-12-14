class SessionsController < ApiController
  skip_before_action :require_login, only: [:create], raise: false

  # login user
  def create
    # if the user login is valid, make a new token for user, then send the token to front
    if user = User.validate_login(params[:username], params[:password])
      allow_token_to_be_used_only_once_for(user)
      send_token_for_valid_login_of(user)
    else
      # uses api_controller method to render an error message
      render_unauthorized("Error with your login or password")
    end
  end

  # logout user
  def destroy
    logout
    head :ok
  end

  private

  def send_token_for_valid_login_of(user)
    render json: {token: user.auth_token}
  end

  def logout
    #uses api controller's current_user and User's invalidate_token to take token off of user
    current_user.invalidate_token
  end

end
