class AddStatusToProduct < ActiveRecord::Migration[7.0]
  def change
    add_column :products, :status, :integer, default: 1, null: false

    # Optionally, you can add an index on the new column for better performance
    add_index :products, :status

    # Update existing products to have a status of 1 (AVAILABLE)
    Product.update_all(status: 1)
  end
end
