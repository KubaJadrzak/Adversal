class Review < ApplicationRecord
  belongs_to :reviewer, class_name: 'User'
  belongs_to :subject, class_name: 'User'

  validates :text, presence: true
  validates :rating, presence: true, inclusion: { in: 1..5 }
  validate :reviewer_is_not_subject
  validates :reviewer_id, uniqueness: { scope: :subject_id, message: 'has already reviewed this user' }

  default_scope { includes(:reviewer, :subject) }

  private

  def reviewer_is_not_subject
    errors.add(:reviewer_id, "can't be the same as subject_id") if reviewer_id == subject_id
  end
end
