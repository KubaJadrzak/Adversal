require "test_helper"

class CartProductsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @cart_product = cart_products(:one)
  end

  test "should get index" do
    get api_v1_cart_products_url, as: :json
    assert_response :success
  end

  test "should create cart_product" do
    assert_difference("CartProduct.count") do
      post api_v1_cart_products_url, params: {
        cart_product: {buyer_id: users(:three).id, carted_product_id: products(:one).id }
      }, as: :json
    end
    assert_response :created
  end

  test "should show cart_product" do
    get api_v1_cart_product_url(@cart_product), as: :json
    assert_response :success
  end

  test "should update cart_product" do
    patch api_v1_cart_product_url(@cart_product), params: { cart_product: {buyer_id: users(:four).id, carted_product_id: products(:one).id } }, as: :json
    assert_response :success
  end

  test "should destroy cart_product" do
    assert_difference("CartProduct.count", -1) do
      delete api_v1_cart_product_url(@cart_product), as: :json
    end

    assert_response :no_content
  end
end
