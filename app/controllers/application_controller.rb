class ApplicationController < ActionController::API
    before_action :set_current_user

    def set_current_user
        Current.user = User.find_by(id: 1)
    end
end