# frozen_string_literal: true

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

class Product < ApplicationRecord
  validates :category_id, presence: true
  validates :seller_id, presence: true
  validates_length_of :title, :maximum => 64

  enum status: { LIVE: 1, SOLD: 2, HIDDEN: 3, DELETED: 4 }
  belongs_to :category
  belongs_to :seller, class_name: :User, inverse_of: :listed_products, foreign_key: :seller_id, default: lambda {
                                                                                                           Current.user
                                                                                                         }
  has_many_attached :images


  scope :only_listed_products, -> { where(seller_id: Current.user) }
  scope :without_listed_products, -> { where.not(seller_id: Current.user) }
  scope :without_deleted_products, -> { where.not(status: 4) }
end
