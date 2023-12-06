Rails.application.routes.draw do
  namespace :api, defaults: {format: :json}  do
    namespace :v1 do
      resources :orders
      resources :cart_products
      resources :products do
        delete 'delete_image/:index', to: 'products#delete_image', on: :member, as: :delete_image
      end
      resources :categories
      resources :users do
        delete 'delete_image', to: 'users#delete_image', on: :member, as: :delete_image
      end
      end
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
