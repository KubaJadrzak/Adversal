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
  has_one_attached :image

  validates :name, presence: true
  validates :phone_number, presence: true
  validates :country, presence: true
  validates :city, presence: true
  validates :street, presence: true
  validates :zip_code, presence: true

  def full_address
    "#{street}, #{city}, #{zip_code}, #{country}"
  end
end
