# frozen_string_literal: true

json.products do
  json.array! @products, partial: 'products/product', as: :product
end

json.meta do
  json.current_page @products.current_page
  json.next_page @products.next_page
  json.prev_page @products.prev_page
  json.total_pages @products.total_pages
  json.total_count @products.total_count
end
