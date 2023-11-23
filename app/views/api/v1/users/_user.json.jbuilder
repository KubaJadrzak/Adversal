json.extract! user, :id, :name, :email

if defined?(with_listed_products)
    json.listed_products user.listed_products, partial: 'api/v1/products/product', as: :product
end