class ApplicationMailer < ActionMailer::Base
  default from: 'adversal@gmail.com'
  layout 'mailer'

  def order_confirmation_email(order, product)
    @order = order
    @product = product
    @buyer = @order.buyer # Replace with your actual association

    mail(to: @buyer.email, subject: 'Order Confirmation')
  end
  def order_placement_email(order, product)
    @order = order
    @product = product
    @buyer = @order.buyer # Replace with your actual association

    mail(to: @buyer.email, subject: 'Order Confirmation')
  end
  def order_payed_email(order)
    @order = order
    @product = order.product
    @buyer = @order.buyer # Replace with your actual association

    mail(to: @buyer.email, subject: 'Order Payed')
  end
  def order_shipped_email(order)
    @order = order
    @product = order.product
    @buyer = @order.buyer # Replace with your actual association
  
    mail(to: @buyer.email, subject: 'Order Shipped')
  end
  
  def order_delivered_email(order)
    @order = order
    @product = order.product
    @buyer = @order.buyer # Replace with your actual association
  
    mail(to: @buyer.email, subject: 'Order Delivered')
  end
  
  def order_failed_email(order)
    @order = order
    @product = order.product
    @buyer = @order.buyer # Replace with your actual association
  
    mail(to: @buyer.email, subject: 'Order Failed')
  end
end