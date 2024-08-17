# frozen_string_literal: true

json.extract! category, :id, :name
json.subcategories category.subcategories, partial: 'categories/subcategory', as: :subcategory
