json.array!(@favorites) do |favorite|
  json.partial! 'products/product', product: favorite
end