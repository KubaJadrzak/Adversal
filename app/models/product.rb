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
#  order_id    :bigint
#
class Product < ApplicationRecord

    validates :category_id, presence: true
    validates :seller_id, presence: true

    enum status: { AVAILABLE: 1, ORDERED: 2, SOLD: 3, DELETED: 4 }
    belongs_to :order, optional: true
    belongs_to :category
    belongs_to :seller, class_name: :User, inverse_of: :listed_products, foreign_key: :seller_id, default: -> { Current.user }
    has_many :cart_products, foreign_key: :carted_product_id, dependent: :destroy
    has_many :buyers, through: :cart_products, source: :user
    has_many_attached :images

    scope :without_carted_products, -> {where.not(id: includes(:cart_products).where(cart_products: {buyer_id: Current.user} ).select(:carted_product_id))}
    scope :only_listed_products, -> { where(seller_id: Current.user) }
    scope :without_listed_products, -> { where.not(seller_id: Current.user) }
    scope :without_ordered_products, -> { where(order_id: nil) }
    scope :without_deleted_products, -> { where.not(status: 4) }

end
