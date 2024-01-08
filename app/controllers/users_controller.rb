class UsersController < ApplicationController
  before_action :set_user, only: %i[ show update destroy ]

  # GET /users
  # GET /users.json
  def index
    @users = User.all
  end

  # GET /users/1
  # GET /users/1.json
  def show
  end


  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
  end

  def delete_image
    # Find the user
    @user = User.find(params[:id])

    # Purge the associated image if it exists
    if @user.image.attached?
      @user.image.purge
      render json: { message: 'Image deleted successfully' }
    else
      render json: { message: 'No image attached to the user' }, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.permit(:name, :email, :image)
    end
end
