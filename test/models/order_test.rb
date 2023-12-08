# == Schema Information
#
# Table name: orders
#
#  id          :bigint           not null, primary key
#  buyer_id    :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  number      :string
#  status      :integer          default("CREATED")
#  country     :string
#  city        :string
#  address     :text
#  postal_code :string
#
require "test_helper"

class OrderTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
