# frozen_string_literal: true

# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  if Rails.env.production?
    allow do
      origins 'https://adversal.it', 'http://adversal.it', 'http://www.adversal.it', 'https://www.adversal.it'

      resource '*',
               headers: :any,
               expose: ['Authorization'],
               methods: %i[get post put patch delete options head show]
    end
  else
    allow do
      origins '*'

      resource '*',
               headers: :any,
               expose: ['Authorization'],
               methods: %i[get post put patch delete options head show]
    end
  end
end
