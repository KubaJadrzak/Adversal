json.extract! order, :id, :number, :buyer_id, :status, :country, :city, :address, :postal_code
json.created_at order.created_at.strftime('%Y-%m-%d')
json.product order.product, partial: "products/product", as: :product
