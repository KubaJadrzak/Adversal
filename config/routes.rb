Rails.application.routes.draw do
  resources :favorites, only: [:create, :destroy] do
    collection do
      get :user_favorites
    end
  end
  resources :reviews
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

    # Custom route for changing password
    devise_scope :user do
      put '/change_password', to: 'users/passwords#change_password'
    end

    # Routes for managing users and deleting user images
    resources :users, only: %i[show edit update] do
      delete 'delete_image', to: 'users#delete_image', on: :member, as: :delete_image
    end

    # Routes for managing products and deleting product images
    resources :products do
      delete 'delete_image/:index', to: 'products#delete_image', on: :member, as: :delete_image
    end

    # Other resources and routes in your application
    resources :cart_products
    resources :categories
  end
end
