json.extract! cart, :id
json.products cart.products, partial: 'api/v1/products/product', as: :product

