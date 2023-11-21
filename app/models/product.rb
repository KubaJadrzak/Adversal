# == Schema Information
#
# Table name: products
#
#  id          :bigint           not null, primary key
#  title       :text
#  price       :decimal(8, 2)
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  category_id :bigint           not null
#  user_id     :bigint           not null
#
class Product < ApplicationRecord
    validates :category_id, presence: true
    validates :seller_id, presence: true
    belongs_to :category
    belongs_to :seller, class_name: :User, foreign_key: :seller_id
    has_many :users, through: :cart_products
end
