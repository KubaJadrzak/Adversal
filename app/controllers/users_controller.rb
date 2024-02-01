class UsersController < ApplicationController
  before_action :set_user, only: %i[ show update destroy ]
  before_action :authenticate_user!
  load_and_authorize_resource

  # GET /users
  # GET /users.json
  def index
    @users = User.all
  end

  # GET /users/1
  # GET /users/1.json
  def show
  end

  def update


    if @user.update(user_params)
      render :show, status: :ok, location: user_url(@user)
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def destroy

    @user.destroy
  end

  def delete_image


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
      params.require(:user).permit(:name, :email, :image)
    end
end
