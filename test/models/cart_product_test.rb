# frozen_string_literal: true

# == Schema Information
#
# Table name: cart_products
#
#  id                :bigint           not null, primary key
#  buyer_id          :bigint           not null
#  carted_product_id :bigint           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
require 'test_helper'

class CartProductTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
