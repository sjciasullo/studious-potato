class ExperimentsController < ApiController
  before_action :require_login

  def index
    @user = current_user
    experiments = Experiment.all.where(user_id: @user.id)
    datesFormatted = []
    experiments.each do |experiment|
      date = {
        id: experiment.id,
        title: experiment.title,
        description: experiment.description,
        current_trial: experiment.current_trial,
        warning_flag: experiment.warning_flag,
        user_id: experiment.user_id,
        created_at: experiment.created_at.to_s(:long),
        updated_at: experiment.updated_at.to_s(:long)
      }
      datesFormatted.push(date)
    end
    render json: { experiments: datesFormatted}
  end

  def show
    experiment = Experiment.find(params[:id])
    if experiment.user_id != current_user.id
      render json: {message: 'Not your experiment!'} 
    else
      formattedExperiment = {
        id: experiment.id,
        title: experiment.title,
        description: experiment.description,
        current_trial: experiment.current_trial,
        warning_flag: experiment.warning_flag,
        user_id: experiment.user_id,
        created_at: experiment.created_at.to_s(:long),
        updated_at: experiment.updated_at.to_s(:long)
      }
      trials = experiment.trials
      formattedTrials = []
      trials.each do |trial|
        formatted = {
          id: trial.id,
          trial_num: trial.trial_num,
          notes: trial.notes,
          experiment_id: trial.experiment_id,
          created_at: trial.created_at.to_s(:long),
          updated_at: trial.updated_at.to_s(:long),
          data: trial.datapoints,
        }
        formattedTrials.push(formatted)
      end
      render json: { 
        experiment: formattedExperiment, 
        message: 'ok',
        trials: formattedTrials,
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
