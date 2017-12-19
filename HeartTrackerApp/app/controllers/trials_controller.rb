class TrialsController < ApiController
  before_action :require_login

  def index
    trials = Trial.all.where(experiment_id: params[:experiment_id])
    formattedTrials = []
      trials.each do |trial|
        formatted = {
          id: trial.id,
          trial_num: trial.trial_num,
          notes: trial.notes,
          experiment_id: trial.experiment_id,
          created_at: trial.created_at.to_s(:long),
          updated_at: trial.updated_at.to_s(:long),
        }
        formattedTrials.push(formatted)
      end
    render json: {
      trials: formattedTrials
    }
  end

  def show
    trial = Trial.find(params[:id])
    formatted = {
      id: trial.id,
      trial_num: trial.trial_num,
      notes: trial.notes,
      experiment_id: trial.experiment_id,
      created_at: trial.created_at.to_s(:long),
      updated_at: trial.updated_at.to_s(:long),
    }
    render json: {
      trial: formatted,
      data: trial.datapoints
    }
  end

  def create
    trial = Trial.new(trial_params)
    trial.experiment_id = params[:experiment_id]
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
    trial = Trial.find(params[:id])
    if trial.update(trial_params)
      render json: {
        message: 'ok',
        trial: trial
      }
    else
      render json: {
        message: 'Failed. Could not edit trial'
      }
    end
  end

  private
  def trial_params
    params.require(:trial).permit(:notes)
  end
end
