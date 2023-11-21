json.extract! cart_product, :id, :product, :user
json.url cart_product_url(cart_product, format: :json)
