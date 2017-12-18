class TrialsController < ApiController
  before_action :require_login

  def show
  end

  def create
  end

  def update
  end

  private
  def trial_params
    params.require(:trial).permit(:description)
  end
end
