class OrdersController < ApplicationController
  before_action :set_order, only: %i[ show update destroy ]
  before_action :authenticate_user!
  load_and_authorize_resource


  # GET /orders
  # GET /orders.json
  def index
    @orders = Order.all
    if params[:only_personal_orders].to_s == "true"
      @orders = @orders.only_personal_orders
    end
    if params[:only_customer_orders].to_s == "true"
      @orders = @orders.only_customer_orders
    end
    if params[:query].present? && params[:query].is_a?(String)
      @orders = @orders.joins(:product).where("products.title ILIKE ?", "%#{params[:query]}%")
    end
  end

  # GET /orders/1
  # GET /orders/1.json
  def show
  end

  # POST /orders
  # POST /orders.json
  def create
    product = Product.find(params[:product_id])

    # Update the product status to "SOLD" when the order is created
    product.update(status: 2, order_id: @order.id)
      if @order.save
        product = Product.find(params[:product_id])
        product.update(order_id: @order.id)

        cart_product = CartProduct.find_by(carted_product_id: product.id, buyer_id: Current.user)
        cart_product.destroy

        ApplicationMailer.order_confirmation_email(@order, product).deliver_now
        ApplicationMailer.order_placement_email(@order, product).deliver_now
        render :show, status: :created, location: order_url(@order)
      else
        render json: @order.errors, status: :unprocessable_entity
      end
  end



  # PATCH/PUT /orders/1
  # PATCH/PUT /orders/1.json
  def update
    if @order.update(order_params)
      # Check if the order status is being updated to "delivered"
      case order_params[:status].to_i
      when 2
        ApplicationMailer.order_payed_email(@order).deliver_now
      when 3
        ApplicationMailer.order_shipped_email(@order).deliver_now
      when 4
        ApplicationMailer.order_delivered_email(@order).deliver_now
      when 5
        ApplicationMailer.order_failed_email(@order).deliver_now
      end

      if order_params[:status] == 4
        product = @order.product

        # Update the product status to "SOLD" when the order is delivered
        product.update(status: 3)
      end

      render :show, status: :ok, location: orders_url(@order)
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
      params.require(:order).permit(:buyer_id, :country, :status, :city, :address, :postal_code, :only_personal_orders, :query, :product_id)
    end
end
