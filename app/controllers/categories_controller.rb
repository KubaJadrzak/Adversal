class CategoriesController < ApplicationController
  before_action :set_category, only: %i[ show update destroy ]
  before_action :authenticate_user!, except: :index

  # GET /categories
  def index
    @categories = Category.all
  end

  # GET /categories/1
  def show
  end

  # POST /categories
  def create
    authorize! :create, @category
    @category = Category.new(category_params)

    if @category.save
      render json: @category, status: :created, location: categories_url(@category)
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /categories/1
  def update
    authorize! :update, @category
    if @category.update(category_params)

      render json: @category
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  # DELETE /categories/1
  def destroy
    authorize! :destroy, @category
    @category.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_category
      @category = Category.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def category_params
      params.require(:category).permit(:name)
    end
end
