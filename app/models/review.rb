class Review < ApplicationRecord
  belongs_to :reviewer, class_name: 'User'
  belongs_to :subject, class_name: 'User'

  validates :text, presence: true
  validates :rating, presence: true, inclusion: { in: 1..5 }

  default_scope { includes(:reviewer, :subject) }
end