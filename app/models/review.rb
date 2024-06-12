class Review < ApplicationRecord
  belongs_to :user

  validates :text, presence: true
  validates :rating, presence: true, inclusion: { in: 1..5 }
end