class CreateExperiments < ActiveRecord::Migration[5.1]
  def change
    create_table :experiments do |t|
      t.string :title
      t.text :description
      t.integer :current_trial
      t.boolean :warning_flag
      t.belongs_to :user
      t.timestamps
    end
  end
end
