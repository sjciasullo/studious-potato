class Trial < ApplicationRecord
  belongs_to :experiment

  # before create we want to increment
  before_create :set_trial_num
  private
  def set_trial_num
    self.experiment.current_trial += 1
    self.experiment.save
    self.trial_num = self.experiment.current_trial
  end
end
