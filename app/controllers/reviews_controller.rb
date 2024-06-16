class ReviewsController < ApplicationController
  before_action :set_review, only: %i[show update destroy]

  # GET /reviews
  # GET /reviews.json
  def index
    @reviews = Review.all
  end

  # GET /reviews/1
  # GET /reviews/1.json
  def show
  end

  # POST /reviews
  # POST /reviews.json
  def create
    @review = Review.new(review_params)
    @review.reviewer = current_user

    if @review.save
      render :show, status: :created, location: @review
    else
      render json: @review.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /reviews/1
  # PATCH/PUT /reviews/1.json
  def update
    if @review.update(review_params)
      render :show, status: :ok, location: @review
    else
      render json: @review.errors, status: :unprocessable_entity
    end
  end

  # DELETE /reviews/1
  # DELETE /reviews/1.json
  def destroy
    @review.destroy
  end

  # GET /reviews/user_reviews
  # GET /reviews/user_reviews.json
  def user_reviews
    @reviews = Review.where(reviewer_id: current_user.id).or(Review.where(subject_id: current_user.id))
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_review
    @review = Review.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def review_params
    params.require(:review).permit(:subject_id, :text, :rating)
  end
end
