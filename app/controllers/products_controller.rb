# frozen_string_literal: true

class ProductsController < ApplicationController
  before_action :set_product, only: %i[show update destroy update_images delete_image]
  before_action :authenticate_user!, only: %i[index update destroy update_images delete_image current_user_products], if: :authentication_required?
  load_and_authorize_resource

  # GET /products
  def index
    # Initial filter to exclude products with status other than 1
    @products = Product.where(status: 1)

    if params[:category].present?
      category_id = params[:category].to_i
      category_ids = Category.descendant_ids(category_id)

      @products = @products.where(category_id: category_ids).distinct
    end

    if params[:query].present? && params[:query].is_a?(String)
      @products = @products.where('title ILIKE ?', "%#{params[:query]}%")
    end

    if params[:min_price].present?
      @products = @products.where('price >= ?', params[:min_price].to_f)
    end

    if params[:max_price].present?
      @products = @products.where('price <= ?', params[:max_price].to_f)
    end

    # Pagination
    @products = @products.page(params[:page]).per(20)

  end

  def current_user_products
    @products = Product.where(seller_id: current_user.id).where.not(status: 4)

    if params[:status].present?
      @products = @products.where(status: Product.statuses[params[:status].upcase])
    end

  end


  # GET /user_products/:user_id
  def user_products
    user_id = params[:user_id]
    @products = Product.where(seller_id: user_id, status: 1)

    if params[:query].present? && params[:query].is_a?(String)
      @products = @products.where('title ILIKE ?', "%#{params[:query]}%")
    end


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

  if product_params[:images].present?
    new_images_count = product_params[:images].count
    total_images_count = @product.images.size + new_images_count

    if total_images_count > 6
      render json: { errors: "You can attach up to 6 images only." }, status: :unprocessable_entity
      return
    end

    @product.images.attach(product_params[:images])
  end

  if @product.update(product_params.except(:images))
    render json: @product
  else
    render json: @product.errors, status: :unprocessable_entity
  end
end



  # DELETE /products/1
  def destroy
    if @product.update(status: 4)
      render json: { message: 'Product status changed to DELETED successfully' }, status: :ok
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  # DELETE /products/1/delete_image
  def delete_image
    index_to_delete = params[:index].to_i
    image_to_delete = @product.images[index_to_delete]

    unless image_to_delete
      return render json: { error: 'Invalid image index or image not found' }, status: :unprocessable_entity
    end

    # Purge the image from Active Storage
    image_to_delete.purge

    render json: { message: 'Image deleted successfully' }, status: :ok
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
      :seller_id, :status, :with_seller, :only_listed_products,
      :without_listed_products, :with_ordered_products, :with_deleted_products, :category, :query, images: []
    )
  end

  def authentication_required?
    params.key?(:only_listed_products) || params.key?(:with_ordered_products) || params.key?(:with_deleted_products)
  end
end
