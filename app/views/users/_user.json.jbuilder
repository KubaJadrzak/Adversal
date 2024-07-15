# frozen_string_literal: true

json.extract! user, :id, :name, :email, :phone_number, :full_address, :average_rating, :favorite_products, :unconfirmed_email
json.image rails_blob_path(user.image, only_path: true) if user.image.attached?
