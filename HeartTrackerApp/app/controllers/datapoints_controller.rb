class DatapointsController < ApiController
  before_action :require_login

  def index
    render json: {
      data: Datapoint.all.where(trial_id: params[:trial_id]),
    }
  end

  def create
    datapoint = Datapoint.new(datapoint_params)
    datapoint.trial_id = params[:trial_id]
    if datapoint.save
      render json: {
        message: 'ok',
        datapoint: datapoint,
      }
    else
      render json: {
        message: 'could not create datapoint'
      }
    end
  end

  def update
    datapoint = Datapoint.find(params[:id])
    if datapoint.update(datapoint_params)
      render json: {
        message: 'ok',
        datapoint: datapoint,
      }
    else
      render json: {
        message: 'Failed. Could not edit datapoint'
      }
    end
  end

  def destroy
    Datapoint.delete(params[:id])
    render json: {message: 'ok'}
  end

  private
  def datapoint_params
    params.require(:datapoint).permit(:heartrate)
  end
end
