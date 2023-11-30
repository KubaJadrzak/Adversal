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
#  seller_id   :bigint           not null
#
class Product < ApplicationRecord

    validates :category_id, presence: true
    validates :seller_id, presence: true
    belongs_to :category
    belongs_to :seller, class_name: :User, inverse_of: :listed_products, foreign_key: :seller_id, default: -> { Current.user }
    has_many :cart_products, foreign_key: :carted_product_id, dependent: :destroy
    has_many :buyers, through: :cart_products, source: :user
    has_one_attached :image

    scope :without_carted_products, -> {where.not(id: includes(:cart_products).where(cart_products: {buyer_id: Current.user} ).select(:carted_product_id))}

end
