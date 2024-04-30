# frozen_string_literal: true

class ProductsController < ApplicationController
  before_action :set_product, only: %i[show update destroy]
  before_action :authenticate_user!, only: %i[index], if: :authentication_required?
  before_action :authenticate_user!, only: %i[update destroy]
  load_and_authorize_resource

  # GET /products
  def index
    @products = Product.all

    if params[:category].present?
      category = Category.find_by(name: params[:category])
      @products = @products.where(category:) if category.present?
    end
    @products = @products.only_listed_products if params[:only_listed_products].to_s == 'true'

    @products = @products.without_carted_products if params[:without_carted_products].to_s == 'true'

    @products = @products.without_listed_products if params[:without_listed_products].to_s == 'true'

    @products = @products.without_deleted_products if params[:with_deleted_products].to_s != 'true'

    @products = @products.without_ordered_products if params[:with_ordered_products].to_s != 'true'
    return unless params[:query].present? && params[:query].is_a?(String)

    @products = @products.where('title ILIKE ?', "%#{params[:query]}%")
  end

  # GET /products/1
  def show; end

  # POST /products
  def create
    @product = Product.new(product_params)

    if @product.save
      render json: @product, status: :created, location: products_url(@product)
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /products/1
  def update
    @product = Product.find(params[:id])

    @product.images.attach(product_params[:images]) if product_params[:images].present?

    if @product.update(product_params.except(:images))
      render json: @product
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @product = Product.find(params[:id])

    if @product.update(status: 4)
      render json: { message: 'Product status changed to DELETED successfully' }, status: :ok
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  def delete_image
    @product = Product.find(params[:id])

    index_to_delete = params[:index].to_i
    if @product.images[index_to_delete].present?
      @product.images[index_to_delete].purge
      render json: { message: 'Image deleted successfully' }, status: :ok
    else
      render json: { error: 'Invalid image index' }, status: :unprocessable_entity
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_product
    @product = Product.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def product_params
    params.require(:product).permit(
      :title, :price, :description, :category_id,
      :seller_id, :with_seller, :only_listed_products,
      :without_listed_products, :with_ordered_products, :with_deleted_products, :category, :query, images: []
    )
  end

  def authentication_required?
    params.key?(:only_listed_products) || params.key?(:with_ordered_products) || params.key?(:with_deleted_products)
  end
end
