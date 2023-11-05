class User < ApplicationRecord
    validates :email, presence: true, uniqueness: true
    has_many :products, dependent: :destroy
    has_one :cart, dependent: :destroy
end
