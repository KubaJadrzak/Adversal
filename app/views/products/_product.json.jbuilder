# frozen_string_literal: true

json.extract! product, :id, :title, :description, :price, :status
json.category product.category, partial: 'categories/category', as: :category
json.seller product.seller, partial: 'users/user', as: :user
json.images(product.images.map { |image| rails_blob_path(image, only_path: true) }) if product.images.attached?
