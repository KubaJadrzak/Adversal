# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)

    can :read, :all
    return unless user.present?
    can :create, [Product, Order, CartProduct]
    cannot :create, :all
    can :update, Product, user_id: user.id
    can :update, Order, user_id: user.id
    can :update, User, user_id: user.id
    cannot :update, :all

    # Allow deletion of own products
    can :destroy, Product, user_id: user.id
    can :destroy, CartProduct, user_id: user.id
    # Restrict deletion of other resources
    cannot :destroy, :all
  end
end