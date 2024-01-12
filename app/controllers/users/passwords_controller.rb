class Users::PasswordsController < Devise::PasswordsController
    include RackSessionsFix
    respond_to :json

    def change_password
      user = current_user

      if user.valid_password?(params[:current_password])
        user.update(password: params[:password])
        render json: { message: 'Password changed successfully' }
      else
        render json: { error: 'Invalid current password' }, status: :unprocessable_entity
      end
    end
  end