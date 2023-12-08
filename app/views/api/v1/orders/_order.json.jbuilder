json.extract! order, :id, :number, :buyer_id, :status, :country, :city, :address, :postal_code
json.product order.product, partial: "api/v1/products/product", as: :product
