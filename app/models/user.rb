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
    has_many :products, foreign_key: :seller_id, inverse_of: :user, dependent: :destroy
end
