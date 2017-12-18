class Trial < ApplicationRecord
  belongs_to :experiment
  has_many :datapoints

  # before create we want to increment current_trial of experiment and set that to trial_num
  before_create :set_trial_num
  
  private
  def set_trial_num
    self.experiment.current_trial += 1
    self.experiment.save
    self.trial_num = self.experiment.current_trial
  end
end
