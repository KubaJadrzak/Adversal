json.array!(@reviews) do |review|
    json.extract! review, :id, :text, :rating, :created_at
  
    json.reviewer do
      json.partial! 'users/user', user: review.reviewer
    end
  
    json.subject do
      json.partial! 'users/user', user: review.subject
    end
  end