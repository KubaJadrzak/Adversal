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
    belongs_to :user, foreign_key: :buyer_id, default: -> { Current.user }
    belongs_to :product, foreign_key: :carted_product_id
end
