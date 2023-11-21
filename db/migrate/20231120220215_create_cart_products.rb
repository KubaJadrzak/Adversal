class CreateCartProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :cart_products do |t|
      t.references :buyer, null:false, foreign_key: {to_table: :users}
      t.references :product, null:false, foreign_key: true
      t.timestamps
    end
  end
end
