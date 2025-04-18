# frozen_string_literal: true

require 'test_helper'

class FavoritesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @favorite = favorites(:one)
  end

  test 'should get index' do
    get favorites_url, as: :json
    assert_response :success
  end

  test 'should create favorite' do
    assert_difference('Favorite.count') do
      post favorites_url, params: { favorite: { product_id: @favorite.product_id, user_id: @favorite.user_id } },
                          as: :json
    end

    assert_response :created
  end

  test 'should show favorite' do
    get favorite_url(@favorite), as: :json
    assert_response :success
  end

  test 'should update favorite' do
    patch favorite_url(@favorite),
          params: { favorite: { product_id: @favorite.product_id, user_id: @favorite.user_id } }, as: :json
    assert_response :success
  end

  test 'should destroy favorite' do
    assert_difference('Favorite.count', -1) do
      delete favorite_url(@favorite), as: :json
    end

    assert_response :no_content
  end
end
