# frozen_string_literal: true

Rails.application.routes.draw do
  defaults format: :json, protocol: 'https' do
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

    devise_scope :user do
      put '/change_password', to: 'users/passwords#change_password'
    end
    resources :users, only: %i[show edit update] do
      delete 'delete_image', to: 'users#delete_image', on: :member, as: :delete_image
    end
    resources :cart_products
    resources :products do
      delete 'delete_image/:index', to: 'products#delete_image', on: :member, as: :delete_image
    end
    resources :categories
  end
end
