# app/models/product.rb

class Product < ApplicationRecord
  validates :category_id, presence: true
  validates :seller_id, presence: true
  validates_length_of :title, maximum: 100

  enum status: { LIVE: 1, SOLD: 2, HIDDEN: 3, DELETED: 4 }
  belongs_to :category
  belongs_to :seller, class_name: :User, inverse_of: :listed_products, foreign_key: :seller_id, default: -> { Current.user }
  has_many_attached :images
  has_many :favorites
  has_many :favorited_by_users, through: :favorites, source: :user

  private

  def category_must_be_leaf
    if category && category.subcategories.exists?
      errors.add(:category, "must be a leaf category (i.e., it should not have any subcategories)")
    end
  end
end
