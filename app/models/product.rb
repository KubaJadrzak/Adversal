class Product < ApplicationRecord
    validates :category_id, presence: true
    validates :user_id, presence: true
    belongs_to :category
    belongs_to :user
end
