class Product < ApplicationRecord
    validates :category_id, presence: true
    validates :user_id, presence: true
    belongs_to :category
    belongs_to :user
    has_many :cart_products
    has_many :carts, through: :cart_products
end
