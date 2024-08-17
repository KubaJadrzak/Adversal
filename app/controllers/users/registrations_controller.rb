# frozen_string_literal: true

module Users
  class RegistrationsController < Devise::RegistrationsController
    include RackSessionsFix
    respond_to :json
    before_action :configure_sign_up_params, only: [:create]
    before_action :configure_account_update_params, only: [:update]

    protected

    def configure_sign_up_params
      devise_parameter_sanitizer.permit(:sign_up, keys: %i[
                                          name email phone_number password password_confirmation
                                          country_name country_geoname_id subdivision_name subdivision_geoname_id
                                          county_name county_geoname_id area_name area_geoname_id
                                          place_name place_geoname_id postal_code
                                        ])
    end

    def configure_account_update_params
      devise_parameter_sanitizer.permit(:account_update, keys: %i[name email image])
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

    def respond_with(resource, _opts = {})
      if resource.persisted?
        render json: {
          status: { code: 200, message: 'Signed up successfully.' },
          data: UserSerializer.new(resource).serializable_hash[:data][:attributes]
        }
      else
        render json: {
          status: { message: "User couldn't be created successfully. #{resource.errors.full_messages.to_sentence}" }
        }, status: :unprocessable_entity
      end
    end
  end
end
