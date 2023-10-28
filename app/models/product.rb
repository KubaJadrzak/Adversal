class Product < ApplicationRecord
    validates :category_id, presence: true
    belongs_to :category

    scope :with_category, -> { includes(:category) }
end
