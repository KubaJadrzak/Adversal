# frozen_string_literal: true

class ApplicationController < ActionController::API
  include RackSessionsFix
  before_action :set_current_user
  respond_to :json

  def set_current_user
    Current.user = current_user
  end
end
