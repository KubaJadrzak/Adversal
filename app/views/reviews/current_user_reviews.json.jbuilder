json.array!(@reviews) do |review|
  json.extract! review, :id, :text, :rating
  
  # Format the created_at attribute to only include the date
  json.created_at review.created_at.strftime('%Y-%m-%d')

  json.reviewer do
    json.partial! 'users/user', user: review.reviewer
  end

  json.subject do
    json.partial! 'users/user', user: review.subject
  end
end
