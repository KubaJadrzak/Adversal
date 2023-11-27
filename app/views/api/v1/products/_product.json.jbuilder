json.extract! product, :id, :title, :description, :price
json.category product.category, partial: "api/v1/categories/category", as: :category

if defined?(with_seller)
    json.seller product.seller, partial: "api/v1/users/user", as: :user
end