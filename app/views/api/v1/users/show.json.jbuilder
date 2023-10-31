json.partiapi/v1/users/user", user: @user

json.products do
    json.array! @user.products do |product|
      json.partial! 'api/v1/products/product', product: product
    end
  end