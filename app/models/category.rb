# frozen_string_literal: true

# == Schema Information
#
# Table name: categories
#
#  id         :bigint           not null, primary key
#  name       :text
#  parent_id  :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Category < ApplicationRecord
  validates :name, presence: true, uniqueness: true

  has_many :products, dependent: :destroy

  belongs_to :parent, class_name: 'Category', optional: true
  has_many :subcategories, class_name: 'Category', foreign_key: 'parent_id', dependent: :destroy

  def self.descendant_ids(category_id)
    category = find(category_id)
    descendant_ids = [category_id]
    descendant_ids.concat(category.descendants.pluck(:id))
    descendant_ids
  end

  def descendants
    subcategories.flat_map { |child| [child] + child.descendants }
  end
end
