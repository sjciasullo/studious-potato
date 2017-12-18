class ExperimentsController < ApiController
  before_action :require_login

  def index
    @user = current_user
    experiments = Experiment.all.where(user_id: @user.id)
    # experiments.each do |experiment|
      # add data and trials to index
    # end
    render json: { experiments: experiments}
  end

  def show
    experiment = Experiment.find(params[:id])
    if experiment.user_id != current_user.id
      render json: {message: 'Not your experiment!'} 
    else
      render json: { 
        experiment: experiment, 
        message: 'ok',
        trials: experiment.trials
      }
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
    experiment = Experiment.find(params[:id])
    if experiment.update(experiment_params)
      render json: {
        message: 'ok',
        experiment: experiment,
      }
    else
      render json: {
        message: 'Failed. Could not edit'
      }
    end
  end

  def destroy
    Experiment.delete(params[:id])
    render json: {message: 'ok'}
  end

  private
  def experiment_params
    params.require(:experiment).permit(:title, :description, :warning_flag)
  end
end
