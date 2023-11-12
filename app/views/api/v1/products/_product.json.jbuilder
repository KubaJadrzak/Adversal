json.extract! product, :id, :title, :description, :price, :category

if defined?(with_user)
    json.user product.user, partial: "api/v1/users/user", as: :user
end