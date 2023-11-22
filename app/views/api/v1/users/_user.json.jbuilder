json.extract! user, :id, :name, :email

if defined?(with_listed_products)
    json.listed_products user.listed_products, partial: 'api/v1/products/product', as: :product
end

if defined?(with_carted_products)
    json.carted_products user.carted_products, partial: 'api/v1/products/product', as: :product
end
