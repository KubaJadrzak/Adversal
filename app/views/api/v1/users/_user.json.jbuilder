json.extract! user, :id, :name, :email
json.url api_v1_user_url(user, format: :json)

json.products user.products, partial: 'api/v1/products/product', as: :product
