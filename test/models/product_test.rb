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
#  user_id     :bigint           not null
#
require "test_helper"

class ProductTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
