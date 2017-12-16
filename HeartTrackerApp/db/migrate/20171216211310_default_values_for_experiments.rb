class DefaultValuesForExperiments < ActiveRecord::Migration[5.1]
  def change
    change_column_default(:experiments, :current_trial, 0)
    change_column_default(:experiments, :warning_flag, true)
  end
end
