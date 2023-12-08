# == Schema Information
#
# Table name: orders
#
#  id          :bigint           not null, primary key
#  buyer_id    :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  number      :string
#  status      :integer          default("CREATED")
#  country     :string
#  city        :string
#  address     :text
#  postal_code :string
#
class Order < ApplicationRecord
    before_create :generate_order_number

    enum status: { CREATED: 1, PAYED: 2, SHIPPED: 3, DELIVERED: 4, FAILED: 5 }
    belongs_to :buyer, class_name: :User, foreign_key: :buyer_id, default: -> { Current.user }
    has_one :product, dependent: :destroy

    scope :only_personal_orders, -> { where(buyer_id: Current.user) }

    private

    def generate_order_number
      self.number = SecureRandom.hex(8).upcase
    end

end


