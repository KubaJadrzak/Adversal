# == Schema Information
#
# Table name: orders
#
#  id         :bigint           not null, primary key
#  buyer_id   :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Order < ApplicationRecord
    belongs_to :buyer, class_name: :User, foreign_key: :buyer_id, default: -> { Current.user }
    has_many :products

    scope :only_your_orders, -> {where(buyer_id: Current.User )}
end
