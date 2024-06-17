# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    can :read, :all
    return unless user.present?

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
