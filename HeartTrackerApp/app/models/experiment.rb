class Experiment < ApplicationRecord
  belongs_to :user
  validates_uniqueness_of :title, scope: :user_id #http://datamapper.org/docs/validations.html
  has_many :trials
  has_many :datapoints, through: :trials

end
