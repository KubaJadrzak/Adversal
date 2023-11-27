require "test_helper"

class ProductsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @product = products(:one)
  end

  test "should get index" do
    get api_v1_products_url, as: :json
    assert_response :success
  end

  test "should create product" do
    assert_difference("Product.count") do
      post api_v1_products_url, params: { product: { title: "Keyboard", description: "Good keyboard", price: 19.99, category_id: @product.category.id, seller_id: @product.seller_id} }, as: :json
    end

    assert_response :created
  end

  test "should show product" do
    get api_v1_product_url(@product), as: :json
    assert_response :success
  end

  test "should update product" do
    patch api_v1_product_url(@product), params: { product: { description: @product.description, price: @product.price, title: @product.title, category_id: @product.category.id} }, as: :json
    assert_response :success
  end

  test "should destroy product" do
    assert_difference("Product.count", -1) do
      delete api_v1_product_url(@product), as: :jso
    end

    assert_response :no_content
  end
end
