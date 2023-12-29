# == Schema Information
#
# Table name: users
#
#  id         :bigint           not null, primary key
#  name       :text
#  email      :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class User < ApplicationRecord

    validates :email, presence: true, uniqueness: true
    has_many :orders, foreign_key: :buyer_id, inverse_of: :buyer
    has_many :listed_products, class_name: :Product, inverse_of: :seller, foreign_key: :seller_id, dependent: :destroy
    has_many :cart_products, foreign_key: :buyer_id, dependent: :destroy
    has_many :carted_products, through: :cart_products, source: :product
    has_one_attached :image

end
