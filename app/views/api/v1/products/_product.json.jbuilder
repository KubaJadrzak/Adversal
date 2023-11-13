json.extract! product, :id, :title, :description, :price
json.category product.category, partial: "api/v1/categories/category", as: :category

if defined?(with_user)
    json.user product.user, partial: "api/v1/users/user", as: :user
end