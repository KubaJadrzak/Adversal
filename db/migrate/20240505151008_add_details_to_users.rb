class AddDetailsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :phone_number, :string
    add_column :users, :country, :string
    add_column :users, :county, :string
    add_column :users, :city, :string
    add_column :users, :postal_code, :string
  end
end