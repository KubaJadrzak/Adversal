Rails.application.routes.draw do
  namespace :api, defaults: {format: :json}  do
    namespace :v1 do
      resources :products
      resources :categories
      resources :users
      resources :carts
    end
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
