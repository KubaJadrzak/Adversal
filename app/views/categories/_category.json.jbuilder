json.extract! category, :id, :name
json.subcategories category.subcategories, partial: 'categories/subcategory', as: :subcategory
