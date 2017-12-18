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
    experiment = Experiment.new(experiment_params)
    experiment.user = current_user
    if experiment.save
      render json: {
        message: 'ok',
        experiment: experiment,
      }
    else
      render json: {message: 'Could not create experiment. You may have used title before'}
    end
  end

  def update
  end

  def destroy
    Experiment.delete(params[:id])
  end

  private
  def experiment_params
    params.require(:experiment).permit(:title, :description, :warning_flag)
  end
end
