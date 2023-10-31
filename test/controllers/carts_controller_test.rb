require "test_helper"

class CartsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @cart = carts(:one)
  end

  test "should get index" do
    get carts_url, as: :json
    assert_response :success
  end

  test "should create cart" do
    assert_difference("Cart.count") do
      post carts_url, params: { cart: {  } }, as: :json
    end

    assert_response :created
  end

  test "should show cart" do
    get cart_url(@cart), as: :json
    assert_response :success
  end

  test "should update cart" do
    patch cart_url(@cart), params: { cart: {  } }, as: :json
    assert_response :success
  end

  test "should destroy cart" do
    assert_difference("Cart.count", -1) do
      delete cart_url(@cart), as: :json
    end

    assert_response :no_content
  end
end
