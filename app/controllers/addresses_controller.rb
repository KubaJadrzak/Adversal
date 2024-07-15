class AddressesController < ApplicationController
  require 'httparty'

  def search
    type = params[:type]
    id = params[:id]
    query = params[:query]
    country_code = params[:country_code]

    case type
    when 'country'
      url = "http://api.geonames.org/countryInfoJSON?formatted=true&username=kubajadrzak"
    when 'subdivision'
      if id
        url = "http://api.geonames.org/childrenJSON?formatted=true&geonameId=#{id}&username=kubajadrzak"
      else
        render json: { error: 'Invalid query' }, status: :bad_request
        return
      end
    when 'county'
      if id
        url = "http://api.geonames.org/childrenJSON?formatted=true&geonameId=#{id}&username=kubajadrzak"
      else
        render json: { error: 'Invalid query' }, status: :bad_request
        return
      end
    when 'area'
      if id
        url = "http://api.geonames.org/childrenJSON?formatted=true&&geonameId=#{id}&maxRows=500&username=kubajadrzak"
      else
        render json: { error: 'Invalid query' }, status: :bad_request
        return
      end
    when 'place'
      if id
        url = "http://api.geonames.org/childrenJSON?formatted=true&&geonameId=#{id}&maxRows=500&username=kubajadrzak"
      else
        render json: { error: 'Invalid query' }, status: :bad_request
        return
      end
    when 'postal_code'
      if country_code
        url = "http://api.geonames.org/postalCodeSearchJSON?country=#{country_code}&postalcode_startsWith=#{query}&maxRows=10&username=kubajadrzak"
      else
        render json: { error: 'Invalid query' }, status: :bad_request
        return
      end
    else
      render json: { error: 'Invalid type' }, status: :bad_request
      return
    end

    response = HTTParty.get(url)
    if response.success?
      parsed_response = parse_geonames_response(type, response.parsed_response)
      render json: parsed_response
    else
      render json: { error: 'Failed to fetch data' }, status: :bad_gateway
    end
  end

  private

  def parse_geonames_response(type, response)
    case type
    when 'country'
      response['geonames'].map do |place|
        {
          id: place['geonameId'],
          name: place['countryName'],
          countryCode: place['countryCode']
        }
      end
    when 'subdivision'
      response['geonames'].map do |place|
        {
          id: place['geonameId'],
          name: place['toponymName'],
        }
      end
    when 'county'
      response['geonames'].uniq { |place| place['toponymName'] }.map do |place|
        {
          id: place['geonameId'],
          name: place['toponymName'],
        }
      end
    when 'postal_code'
      if response['postalCodes']
        response['postalCodes'].uniq { |place| place['postalCode'] }.map do |place|
          {
            id: place['geonameId'],
            postal_code: place['postalCode'],
          }
        end
      else
        []  # Empty array if there are no postal codes in the response
      end
    when 'area'
      response['geonames'].uniq { |place| place['toponymName'] }.map do |place|
        {
          id: place['geonameId'],
          name: place['toponymName'],
        }
      end
    when 'place'
      response['geonames'].uniq { |place| place['toponymName'] }.map do |place|
        {
          id: place['geonameId'],
          name: place['toponymName'],
        }
      end
    else
      []
    end
  end
end
