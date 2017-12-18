class TrialsController < ApiController
  before_action :require_login

  def create
    trial = Trial.new(trial_params)
    trial.experiment = params[:experiment_id]
    if trial.save
      render json: {
        message: 'ok',
        trial: trial,
      }
    else
      render json: {
        message: 'could not create trial'
      }
    end
  end

  def update
  end

  private
  def trial_params
    params.require(:trial).permit(:description)
  end
end
