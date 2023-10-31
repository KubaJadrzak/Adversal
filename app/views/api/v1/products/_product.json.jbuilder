json.extract! product, :id, :title, :description, :price, :category, :user
json.url api_v1_product_url(product, format: :json)