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
    validates :email, presence: true, uniqueness: true
    has_many :products, dependent: :destroy
    has_one :cart, dependent: :destroy
end
