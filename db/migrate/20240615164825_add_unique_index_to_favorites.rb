class AddUniqueIndexToFavorites < ActiveRecord::Migration[7.0]
  def change
    add_index :favorites, [:user_id, :product_id], unique: true
  end
end
