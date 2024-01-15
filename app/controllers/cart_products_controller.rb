class CartProductsController < ApplicationController
  before_action :set_cart_product, only: %i[ show update destroy ]
  before_action :authenticate_user!
  load_and_authorize_resource

  # GET /cart_products
  # GET /cart_products.json
  def index
    @cart_products = CartProduct.current_user_cart
  end

  # GET /cart_products/1
  # GET /cart_products/1.json
  def show
  end

  # POST /cart_products
  # POST /cart_products.json
  def create

    @cart_product = CartProduct.new(cart_product_params)
    authorize! :create, @cart_product

    if @cart_product.save
      render :show, status: :created, location: cart_products_url(@cart_product)
    else
      render json: @cart_product.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /cart_products/1
  # PATCH/PUT /cart_products/1.json
  def update
    authorize! :update, @cart_product
    if @cart_product.update(cart_product_params)
      render :show, status: :ok, location: cart_products_url(@cart_product)
    else
      render json: @cart_product.errors, status: :unprocessable_entity
    end
  end

  # DELETE /cart_products/1
  # DELETE /cart_products/1.json
  def destroy
    authorize! :destroy, @cart_product
    @cart_product.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_cart_product
      @cart_product = CartProduct.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def cart_product_params
      params.fetch(:cart_product, {}).permit(:buyer_id, :carted_product_id)
    end
end
