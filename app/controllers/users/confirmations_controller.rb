class Users::ConfirmationsController < Devise::ConfirmationsController

  def show
    super do |resource|
      if resource.confirmed?
        redirect_to 'http://localhost:5173/login' and return
      end
    end
  end
end