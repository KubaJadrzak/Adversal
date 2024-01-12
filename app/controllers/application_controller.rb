class ApplicationController < ActionController::API
    before_action :set_current_user

    def set_current_user
      Current.user = current_user
    end
end