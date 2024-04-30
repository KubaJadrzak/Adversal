# frozen_string_literal: true

json.extract! user, :id, :name, :email
json.image rails_blob_path(user.image, only_path: true) if user.image.attached?
