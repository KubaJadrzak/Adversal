# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    # Guests and all users can read products with status 1
    cannot :read, :all
    can :read, Product, status: 1
    can :read, Category
    can :read, User
    can :user_products, Product, status: 1
    can :user_reviews, Review

    # Return if the user is not logged in
    return unless user.present?

    # Users can read their own products regardless of status
    can :read, Product, seller_id: user.id

    # Additional permissions for logged-in users
    can :current_user_products, Product, seller_id: user.id
    can :current_user_favorites, Favorite, user_id: user.id

    cannot :create, :all
    can :create, Product
    can :create, Review

    cannot :update, :all
    can :update, User, id: user.id
    can :update, Product, seller_id: user.id
    can :update, Review, reviewer_id: user.id
    can :attach_image, Product, seller_id: user.id

    cannot :destroy, :all
    can :destroy, Product, seller_id: user.id
    can :destroy, Review, reviewer_id: user.id
    can :delete_image, Product, seller_id: user.id
    can :delete_image, User, id: user.id
  end
end
