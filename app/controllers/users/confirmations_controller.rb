class Users::ConfirmationsController < Devise::ConfirmationsController

  def show
    super do |resource|
      if resource.confirmed?
        redirect_to Rails.application.config.confirmation_redirect_url, allow_other_host: true and return
      end
    end
  end
end