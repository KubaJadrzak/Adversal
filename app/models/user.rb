# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id         :bigint           not null, primary key
#  name       :text
#  email      :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable, :registerable, :validatable, :recoverable, :confirmable, :trackable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  has_many :listed_products, class_name: :Product, inverse_of: :seller, foreign_key: :seller_id, dependent: :destroy
  has_many :written_reviews, class_name: 'Review', foreign_key: 'reviewer_id'
  has_many :received_reviews, class_name: 'Review', foreign_key: 'subject_id'
  has_many :favorites
  has_many :favorite_products, through: :favorites, source: :product
  has_one_attached :image

  validates :email, presence: true, uniqueness: true
  validates :name, presence: true
  validates :phone_number, presence: true

  def average_rating
    if received_reviews.exists?
      received_reviews.average(:rating).to_f
    else
      0.0
    end
  end

  def full_address
    address_parts = [
      place_name,
      area_name,
      county_name,
      subdivision_name,
      country_name,
      postal_code
    ].compact.reject(&:blank?)

    address_parts.join(', ')
  end

  def short_address
    address_parts = [
      place_name,
      area_name,
      county_name,
      subdivision_name,
      country_name,
      postal_code
    ].compact.reject(&:blank?)

    # Select the last 3 parts if the array has more than 3 elements
    short_address_parts = address_parts.first(2)

    short_address_parts.join(', ')
  end
end
