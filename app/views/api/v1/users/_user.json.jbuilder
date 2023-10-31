json.extract! user, :id, :name, :email
json.url api_v1_user_url(user, format: :json)
