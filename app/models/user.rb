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

  has_many :orders, foreign_key: :buyer_id, inverse_of: :buyer
  has_many :listed_products, class_name: :Product, inverse_of: :seller, foreign_key: :seller_id, dependent: :destroy
  has_many :cart_products, foreign_key: :buyer_id, dependent: :destroy
  has_many :carted_products, through: :cart_products, source: :product
  has_one_attached :image
end
