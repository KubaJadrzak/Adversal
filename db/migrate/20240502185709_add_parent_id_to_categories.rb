# frozen_string_literal: true

class AddParentIdToCategories < ActiveRecord::Migration[6.1]
  def change
    add_column :categories, :parent_id, :bigint
    add_index :categories, :parent_id
  end
end
