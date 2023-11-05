json.extract! cart, :id, :user_id, :products
json.url api_v1_cart_url(cart, format: :json)
