# frozen_string_literal: true

class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.text :title
      t.decimal :price, precision: 8, scale: 2
      t.text :description
      t.timestamps
    end
  end
end
