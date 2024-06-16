class AddReviewerAndSubjectToReviews < ActiveRecord::Migration[7.0]
  def change
    add_reference :reviews, :reviewer, foreign_key: { to_table: :users }
    add_reference :reviews, :subject, foreign_key: { to_table: :users }
  end
end
