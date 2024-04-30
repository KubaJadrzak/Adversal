# frozen_string_literal: true

module Users
  class RegistrationsController < Devise::RegistrationsController
    include RackSessionsFix
    respond_to :json
    before_action :configure_sign_up_params, only: [:create]
    before_action :configure_account_update_params, only: [:update]

    protected

    def configure_sign_up_params
      devise_parameter_sanitizer.permit(:sign_up, keys: %i[name image])
    end

    def configure_account_update_params
      devise_parameter_sanitizer.permit(:account_update, keys: %i[name image])
    end

    def change_password
      user = current_user

      if user.valid_password?(params[:current_password])
        user.update(password: params[:password])
        render json: { message: 'Password changed successfully' }
      else
        render json: { error: 'Invalid current password' }, status: :unprocessable_entity
      end
    end

    def respond_with(current_user, _opts = {})
      if resource.persisted?
        render json: {
          status: { code: 200, message: 'Signed up successfully.' },
          data: UserSerializer.new(current_user).serializable_hash[:data][:attributes]
        }
      else
        render json: {
          status: { message: "User couldn't be created successfully. #{current_user.errors.full_messages.to_sentence}" }
        }, status: :unprocessable_entity
      end
    end
  end
end
