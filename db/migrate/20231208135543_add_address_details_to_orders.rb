# frozen_string_literal: true

class AddAddressDetailsToOrders < ActiveRecord::Migration[7.0]
  def change
    add_column :orders, :country, :string, null: false
    add_column :orders, :city, :string, null: false
    add_column :orders, :address, :text, null: false
    add_column :orders, :postal_code, :string, null: false
  end
end
