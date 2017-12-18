class CreateTrials < ActiveRecord::Migration[5.1]
  def change
    create_table :trials do |t|
      t.integer :trial_num
      t.text :notes
      t.belongs_to :experiment
      t.timestamps
    end
  end
end
