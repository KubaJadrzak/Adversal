json.extract! user, :id, :name, :email
if user.image.attached?
    json.image rails_blob_path(user.image, only_path: true)
end

