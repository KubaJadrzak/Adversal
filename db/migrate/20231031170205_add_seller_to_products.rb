# frozen_string_literal: true

class AddSellerToProducts < ActiveRecord::Migration[7.0]
  def change
    add_reference :products, :seller, null: false, foreign_key: { to_table: :users }
  end
end
