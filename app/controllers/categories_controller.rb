# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :set_category, only: %i[update destroy]
  before_action :authenticate_user!, except: [:index, :show]
  load_and_authorize_resource

  # GET /categories
  def index
    @categories = Category.includes(:subcategories).where.not(subcategories: { id: nil })
  end

  def show
    @category = Category.includes(:subcategories).where.not(subcategories: { id: nil }).find(params[:id])
  end
  # POST /categories
  def create
    @category = Category.new(category_params)

    if @category.save
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /categories/1
  def update
    if @category.update(category_params)

      render json: @category
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  # DELETE /categories/1
  def destroy
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
