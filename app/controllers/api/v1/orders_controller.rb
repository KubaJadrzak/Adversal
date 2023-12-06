class Api::V1::OrdersController < ApplicationController
  before_action :set_order, only: %i[ show update destroy ]

  # GET /orders
  # GET /orders.json
  def index
    @orders = Order.all
  end

  # GET /orders/1
  # GET /orders/1.json
  def show
  end

  # POST /orders
  # POST /orders.json
  def create
    @order = Order.new(order_params)

    ActiveRecord::Base.transaction do
      if @order.save
        product_ids = Array(params[:product_ids])
        products = Product.where(id: product_ids)

        # Check if any of the products already has the given order id
        if products.any? { |product| product.order_id.present? }
          raise ActiveRecord::RecordInvalid.new(@order)
        end

        # Update the products with the order id
        products.each { |product| product.update!(order_id: @order.id) }

        render :show, status: :created, location: api_v1_order_url(@order)
      else
        render json: @order.errors, status: :unprocessable_entity
      end
    end
  rescue ActiveRecord::RecordInvalid => e
    render json: { error: "Failed to assign order id to products: #{e.message}" }, status: :unprocessable_entity
  end

  # PATCH/PUT /orders/1
  # PATCH/PUT /orders/1.json
  def update
    if @order.update(order_params)
      render :show, status: :ok, location: api_v1_orders_url(@order)
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  # DELETE /orders/1
  # DELETE /orders/1.json
  def destroy
    @order.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_order
      @order = Order.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def order_params
      params.require(:order).permit(:buyer_id, product_ids: [])
    end
end
