json.extract! product, :id, :title, :description, :price
json.category product.category, partial: "api/v1/categories/category", as: :category
if product.images.attached?
    json.images product.images.map { |image| rails_blob_path(image, only_path: true) }
end

if defined?(with_seller)
    json.seller product.seller, partial: "api/v1/users/user", as: :user
end