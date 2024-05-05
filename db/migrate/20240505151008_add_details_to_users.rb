class AddDetailsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :phone_number, :string
    add_column :users, :country, :string
    add_column :users, :city, :string
    add_column :users, :street, :string
    add_column :users, :zip_code, :string
  end
end