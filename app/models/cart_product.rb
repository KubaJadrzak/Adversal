# == Schema Information
#
# Table name: cart_products
#
#  id                :bigint           not null, primary key
#  buyer_id          :bigint           not null
#  carted_product_id :bigint           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
class CartProduct < ApplicationRecord
    validates :carted_product_id, uniqueness: { scope: :buyer_id }
    validate :buyer_cannot_be_seller

    belongs_to :user, foreign_key: :buyer_id, default: -> { Current.user }
    belongs_to :product, foreign_key: :carted_product_id

    scope :current_user_cart, -> { where(buyer_id: Current.user) }

    private

    def buyer_cannot_be_seller
      errors.add(:base, "Buyer cannot be the seller of the product") if buyer_is_seller?
    end

    def buyer_is_seller?
      product && product.seller == user
    end
  end