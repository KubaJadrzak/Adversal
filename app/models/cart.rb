# == Schema Information
#
# Table name: carts
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#
class Cart < ApplicationRecord
    has_many :products
    belongs_to :user
    has_many :cart_products
    has_many :products, through: :cart_products
end
