json.extract! product, :id, :title, :description, :price, :order_id, :status
json.category product.category, partial: "categories/category", as: :category
json.seller product.seller, partial: "users/user", as: :user
if product.images.attached?
    json.images product.images.map { |image| rails_blob_path(image, only_path: true) }
  end
