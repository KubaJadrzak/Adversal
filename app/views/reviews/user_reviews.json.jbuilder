# frozen_string_literal: true

json.array!(@reviews) do |review|
  json.partial! 'reviews/review', review:
end
