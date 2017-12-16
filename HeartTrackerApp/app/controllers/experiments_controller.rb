class ExperimentsController < ApiController
  before_action :require_login

  def index
    @user = current_user
    experiments = Experiment.all.where(user_id: @user.id)
    render json: { experiments: experiments}
  end

  def show
    render json: { experiment: Experiment.find(params[:id])}
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
