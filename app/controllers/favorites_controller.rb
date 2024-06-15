class FavoritesController < ApplicationController
  before_action :set_favorite, only: %i[ show update ]
  before_action :authenticate_user!

  # GET /favorites
  # GET /favorites.json
  def index
    @favorites = Favorite.all
  end

  # GET /favorites/1
  # GET /favorites/1.json
  def show
  end

  # POST /favorites
  # POST /favorites.json
  def create
    @favorite = current_user.favorites.new(product_id: params[:product_id])

    if @favorite.save
      render json: { success: true, message: 'Product added to favorites' }
    else
      render json: { success: false, message: 'Unable to add product to favorites' }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /favorites/1
  # PATCH/PUT /favorites/1.json
  def update
    if @favorite.update(favorite_params)
      render :show, status: :ok, location: @favorite
    else
      render json: @favorite.errors, status: :unprocessable_entity
    end
  end

  # DELETE /favorites/1
  # DELETE /favorites/1.json
  def destroy
    @favorite = current_user.favorites.find_by(product_id: params[:id])
  
    if @favorite.destroy
      render json: { success: true, message: 'Product removed from favorites' }
    else
      render json: { success: false, message: 'Unable to remove product from favorites' }, status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound
    render json: { success: false, message: 'Favorite not found' }, status: :not_found
  end
  # GET /favorites/user_favorites
  def user_favorites
    @favorites = current_user.favorite_products
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_favorite
      @favorite = Favorite.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def favorite_params
      params.require(:favorite).permit(:user_id, :product_id)
    end
end
