# == Schema Information
#
# Table name: cart_products
#
#  id         :bigint           not null, primary key
#  cart_id    :integer
#  product_id :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class CartProduct < ApplicationRecord
    belongs_to :cart
    belongs_to :product
end
