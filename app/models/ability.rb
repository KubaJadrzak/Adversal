# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    can :read, :all
    return unless user.present?

    cannot :create, :all
    can :create, Product

    cannot :update, :all
    can :update, User, id: user.id
    can :update, Product, seller_id: user.id

    cannot :destroy, :all
    can :destroy, Product, seller_id: user.id
    can :delete_image, Product, seller_id: user.id
  end
end
