Rails.application.routes.draw do
  # Default settings for JSON format and HTTPS protocol
  defaults format: :json, protocol: 'https' do
    # Devise routes for user authentication
    devise_for :users, path: '', path_names: {
      sign_in: 'login',
      sign_out: 'logout',
      registration: 'signup'
    }, controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations',
      passwords: 'users/passwords',
      confirmations: 'users/confirmations'
    }

    get 'addresses/search', to: 'addresses#search'

    # Custom route for changing password
    devise_scope :user do
      put '/change_password', to: 'users/passwords#change_password'
    end

    resources :favorites, only: [:create, :destroy] do
      collection do
        get 'current_user_favorites', to: 'favorites#current_user_favorites'
      end
    end
  
    resources :reviews do
      collection do
        get 'current_user_reviews', to: 'reviews#current_user_reviews'
        get 'user_reviews/:user_id', to: 'reviews#user_reviews', as: :user_reviews
      end
    end
  

    # Routes for managing users and deleting user images
    resources :users, only: %i[show edit update] do
      member do
        delete 'delete_image', to: 'users#delete_image', as: :delete_image
      end
    end

    # Routes for managing products and deleting product images
    resources :products do
      member do
        delete 'delete_image/:index', to: 'products#delete_image', as: :delete_image
      end

      collection do
        get 'current_user_products', to: 'products#current_user_products'
        get 'user_products/:user_id', to: 'products#user_products', as: :user_products
      end
    end

    # Other resources and routes in your application
    resources :cart_products
    resources :categories
  end
end
