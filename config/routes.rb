Rails.application.routes.draw do
  defaults format: :json do
    devise_for :users, path: '', path_names: {
      sign_in: 'login',
      sign_out: 'logout',
      registration: 'signup'
    },
    controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations'
    }
    resources :users, only: [:show, :edit, :update] do
      delete 'delete_image', to: 'users#delete_image', on: :member, as: :delete_image
    end
    resources :orders
    resources :cart_products
    resources :products do
      delete 'delete_image/:index', to: 'products#delete_image', on: :member, as: :delete_image
    end
    resources :categories
  end
end