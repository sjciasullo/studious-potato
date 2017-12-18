class CreateDatapoints < ActiveRecord::Migration[5.1]
  def change
    create_table :datapoints do |t|
      t.float :heartrate
      t.belongs_to :trial
      t.timestamps
    end
  end
end
