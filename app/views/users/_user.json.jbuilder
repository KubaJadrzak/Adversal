# frozen_string_literal: true

json.extract! user, :id, :name, :email, :phone_number, :full_address, :short_address, :average_rating, :favorite_products, :unconfirmed_email,
              :country_geoname_id, :subdivision_geoname_id, :county_geoname_id, :area_geoname_id, :place_geoname_id, :postal_code
json.image rails_blob_path(user.image, only_path: true) if user.image.attached?
