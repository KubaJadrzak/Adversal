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

  validate :buyer_cannot_buy_own_product

  scope :only_personal_orders, -> { where(buyer_id: Current.user) }
  scope :only_customer_orders, -> { where(id: includes(:product).where(product: {seller_id: Current.user}).select(:order_id)) }
  scope :without_carted_products, -> { where.not(id: includes(:cart_products).where(cart_products: {buyer_id: Current.user}).select(:carted_product_id)) }

  private

  def generate_order_number
    self.number = SecureRandom.hex(8).upcase
  end

  def buyer_cannot_buy_own_product
    errors.add(:base, 'Buyer cannot buy their own product') if product&.seller_id == buyer_id
  end
end

