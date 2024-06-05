# app/models/product.rb

class Product < ApplicationRecord
  validates :category_id, presence: true
  validates :seller_id, presence: true
  validates_length_of :title, maximum: 64

  enum status: { LIVE: 1, SOLD: 2, HIDDEN: 3, DELETED: 4 }
  belongs_to :category
  belongs_to :seller, class_name: :User, inverse_of: :listed_products, foreign_key: :seller_id, default: -> { Current.user }
  has_many_attached :images

  validate :validate_images_limit

  scope :only_listed_products, -> { where(seller_id: Current.user) }
  scope :without_listed_products, -> { where.not(seller_id: Current.user) }
  scope :without_deleted_products, -> { where.not(status: 4) }

  private

  def validate_images_limit
    if images.size > 6
      errors.add(:images, "You can attach up to 6 images only.")
    end
  end
end
