# frozen_string_literal: true

class AddDetailsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :phone_number, :string

    add_column :users, :country_name, :string, null: false
    add_column :users, :country_geoname_id, :integer, null: false

    add_column :users, :subdivision_name, :string
    add_column :users, :subdivision_geoname_id, :integer

    add_column :users, :county_name, :string
    add_column :users, :county_geoname_id, :integer

    add_column :users, :area_name, :string
    add_column :users, :area_geoname_id, :integer

    add_column :users, :place_name, :string
    add_column :users, :place_geoname_id, :integer

    add_column :users, :postal_code, :string
  end
end
