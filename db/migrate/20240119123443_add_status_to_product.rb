# frozen_string_literal: true

class AddStatusToProduct < ActiveRecord::Migration[7.0]
  def change
    add_column :products, :status, :integer, default: 1, null: false

    add_index :products, :status

    Product.update_all(status: 1)
  end
end
