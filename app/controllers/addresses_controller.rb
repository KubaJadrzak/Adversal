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
        render json: { error: 'Invalid country query' }, status: :bad_request
        return
      end
    when 'city'
      if id
        url = "http://api.geonames.org/searchJSON?formatted=true&featureClass=P&country=#{country_code}&adminCode1=#{id}&name_startsWith=#{query}&maxRows=10&username=kubajadrzak"
      else
        render json: { error: 'Invalid subdivision query' }, status: :bad_request
        return
      end
    when 'postal_code'
      if country_code
        url = "http://api.geonames.org/postalCodeSearchJSON?formatted=true&postalcode_startsWith=#{query}&country=#{country_code}&maxRows=10&username=kubajadrzak"
      else
        render json: { error: 'Invalid postal code query' }, status: :bad_request
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
      response['geonames'].map do |country|
        {
          id: country['geonameId'],
          name: country['countryName'],
          countryCode: country['countryCode']
        }
      end
    when 'subdivision'
      response['geonames'].map do |place|
        {
          name: place['name'],
          adminCode1: place['adminCode1']
        }
      end
    when 'city'
      if response['geonames']
        response['geonames'].map do |place|
          {
            name: place['name'],
            county: fetch_county_name(place['geonameId'])
          }
        end
      else
        []  # Empty array if there are no geonames in the response
      end
    when 'postal_code'
      if response['postalCodes']
        unique_postal_codes = response['postalCodes'].uniq { |pc| pc['postalCode'] }  # Filter duplicates by postalCode
        unique_postal_codes.map do |postal_code|
          {
            postal_code: postal_code['postalCode'],
            place_name: postal_code['placeName'],
            adminName1: postal_code['adminName1'],
            country_code: postal_code['countryCode']
          }
        end
      else
        []  # Empty array if there are no postal codes in the response
      end
    else
      []
    end
  end

  def fetch_county_name(geoname_id)
    url = "http://api.geonames.org/hierarchyJSON?formatted=true&geonameId=#{geoname_id}&username=kubajadrzak"
    response = HTTParty.get(url)
    if response.success?
      geonames = response.parsed_response['geonames']
      if geonames
        county = geonames.find { |place| place['fcode'] == 'ADM2' }
        county_name = county ? county['name'] : nil
        # Modify county name if it contains "county" in it
        county_name&.gsub(/\sCounty$/, '')
      else
        nil
      end
    else
      nil
    end
  end
end
