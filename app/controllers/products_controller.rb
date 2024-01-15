class ProductsController < ApplicationController
  before_action :set_product, only: %i[ show update destroy ]
  before_action :authenticate_user!, only: %i[ index ], if: :authentication_required?
  before_action :authenticate_user!, only: %i[ update destroy ]
  load_and_authorize_resource

  # GET /products
  def index
    @products = Product.all

    if params[:category].present?
      category = Category.find_by(name: params[:category])
      @products = @products.where(category: category) if category.present?
    end
    if current_user.present?
      if params[:only_listed_products].to_s == "true"
        @products = @products.only_listed_products
      end

      if params[:without_carted_products].to_s == "true"
        @products = @products.without_carted_products
      end

      if params[:without_listed_products].to_s == "true"
        @products = @products.without_listed_products
      end

      if params[:with_ordered_products].to_s != 'true'
        @products = @products.without_ordered_products
      end
    end
    if params[:query].present? && params[:query].is_a?(String)
      @products = @products.where("title ILIKE ?", "%#{params[:query]}%")
    end
  end

  # GET /products/1
  def show
  end

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
      @product.images.attach(product_params[:images])
    end

    if @product.update(product_params.except(:images))
      render json: @product
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @product = Product.find(params[:id])

    @product.destroy
    render json: { message: 'Product deleted successfully' }, status: :ok
  end

  def delete_image
    @product = Product.find(params[:id])
  
    index_to_delete = params[:index].to_i
    # Check if the image at the specified index exists and is not nil
    if @product.images[index_to_delete].present?
      # Delete the Active Storage attachment at the specified index
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
        :without_listed_products, :category, :query, images: []
      )
    end

    def authentication_required?
      params.key?(:only_listed_products) || params.key?(:with_ordered_products)
    end
end
