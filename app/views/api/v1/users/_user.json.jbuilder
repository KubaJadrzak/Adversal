json.extract! user, :id, :name, :email

if defined?(with_products)
    json.products user.products, partial: 'api/v1/products/product', as: :product
end
