class ExperimentsController < ApiController
  before_action :require_login

  def index
    @user = current_user
    experiments = Experiment.all.where(user_id: @user.id)
    render json: { experiments: experiments}
  end

  def show
    experiment = Experiment.find(params[:id])
    if experiment.user_id != current_user.id
      render json: {message: 'Not your experiment!'} 
    else
      render json: { experiment: Experiment.find(params[:id]), message: 'ok'}
    end
  end

  def create
  end

  def update
  end

  def destroy
  end

  private
  def experiment_params
    params.require(:experiment).permit(:title, :warning_flag)
  end
end
