# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# Define user data
users_data = [
  { 
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    phone_number: '123-456-7890',
    country: 'USA',
    city: 'Anytown',
    street: 'Main St',
    zip_code: '12345',
    jti: SecureRandom.uuid 
  },
  { 
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    password: 'password123',
    phone_number: '987-654-3210',
    country: 'Canada',
    city: 'Maple City',
    street: 'Elm St',
    zip_code: '56789',
    jti: SecureRandom.uuid 
  },
  { 
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    password: 'password123',
    phone_number: '111-222-3333',
    country: 'UK',
    city: 'London',
    street: 'Oak Ave',
    zip_code: '67890',
    jti: SecureRandom.uuid 
  },
  { 
    name: 'Alice Williams',
    email: 'alice.williams@example.com',
    password: 'password123',
    phone_number: '555-444-3333',
    country: 'Australia',
    city: 'Sydney',
    street: 'Pine Rd',
    zip_code: '54321',
    jti: SecureRandom.uuid 
  },
  { 
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    password: 'password123',
    phone_number: '777-888-9999',
    country: 'France',
    city: 'Paris',
    street: 'Cedar Ln',
    zip_code: '98765',
    jti: SecureRandom.uuid 
  },
  { 
    name: 'Eva Davis',
    email: 'eva.davis@example.com',
    password: 'password123',
    phone_number: '999-888-7777',
    country: 'Germany',
    city: 'Berlin',
    street: 'Walnut Blvd',
    zip_code: '45678',
    jti: SecureRandom.uuid 
  }
]

# Define review data
reviews_data = [
  { text: 'Great service!', rating: 5 },
  { text: 'Not bad.', rating: 3 },
  { text: 'Could be better.', rating: 2 },
  { text: 'Excellent!', rating: 5 },
  { text: 'Satisfactory.', rating: 4 },
  { text: 'Terrible experience.', rating: 1 }
]

# Create users first
users = users_data.map do |user_data|
  user = User.find_or_create_by(email: user_data[:email]) do |user_instance|
    user_instance.attributes = user_data
  end
  user.update(confirmed_at: Time.now) # Confirm the user
  user
end

# Create reviews and associate them with users
users.each do |user|
  other_users = users - [user] # Exclude the current user from other users

  # Create 2 reviews where the user is the reviewer
  2.times do
    review_data = reviews_data.sample
    subject_user = other_users.sample
    Review.create(
      review_data.merge(reviewer_id: user.id, subject_id: subject_user.id)
    )
  end

  # Create 2 reviews where the user is the subject
  2.times do
    review_data = reviews_data.sample
    reviewer_user = other_users.sample
    Review.create(
      review_data.merge(reviewer_id: reviewer_user.id, subject_id: user.id)
    )
  end
end




# Seed data for Categories
categories_data = [
  { name: 'Fashion', subcategories: [
    { name: 'Men\'s Clothing' },
    { name: 'Women\'s Clothing' },
    { name: 'Accessories' }
  ] },
  { name: 'Health&Beauty', subcategories: [
    { name: 'Skincare' },
    { name: 'Haircare' },
    { name: 'Makeup' }
  ] },
  { name: 'Electronics', subcategories: [
    { name: 'Smartphones' },
    { name: 'Laptops' },
    { name: 'Headphones' }
  ] },
  { name: 'Automotive', subcategories: [
    { name: 'Car Parts' },
    { name: 'Car Accessories' },
    { name: 'Tools&Equipment' }
  ] },
  { name: 'Fitness', subcategories: [
    { name: 'Gym Equipment' },
    { name: 'Sportswear' },
    { name: 'Supplements' }
  ] }
]

categories_data.each do |category_data|
  # Create the parent category
  parent_category = Category.create(name: category_data[:name])

  # Create subcategories for the parent category
  category_data[:subcategories].each do |subcategory_data|
    parent_category.subcategories.create(name: subcategory_data[:name])
  end
end

# Seed data for Products
products_data = [
  {
    title: 'Luxury Sedan',
    price: 50_000.00,
    category_id: 2,
    seller_id: 1,
    description: 'A sleek and luxurious sedan for your comfortable rides.'
  },
  {
    title: 'Modern Sofa Set',
    price: 1500.00,
    category_id: 3,
    seller_id: 3,
    description: 'Upgrade your living room with this stylish and comfortable sofa set.'
  },
  {
    title: 'Smart LED TV',
    price: 800.00,
    category_id: 4,
    seller_id: 2,
    description: 'Experience high-definition entertainment with this state-of-the-art smart LED TV.'
  },
  {
    title: 'Casual Denim Jacket',
    price: 80.00,
    category_id: 6,
    seller_id: 5,
    description: 'A stylish and comfortable denim jacket for your casual outings.'
  },
  {
    title: 'Gaming Laptop',
    price: 2000.00,
    category_id: 7,
    seller_id: 1,
    description: 'Powerful gaming laptop with high-performance graphics for an immersive gaming experience.'
  },
  {
    title: 'Professional DSLR Camera',
    price: 1500.00,
    category_id: 8,
    seller_id: 5,
    description: 'Capture stunning moments with this high-performance professional DSLR camera.'
  },
  {
    title: 'Portable Bluetooth Speaker',
    price: 50.00,
    category_id: 10,
    seller_id: 2,
    description: 'Enjoy music on the go with this compact and powerful portable Bluetooth speaker.'
  },
  {
    title: 'Wireless Noise-Canceling Headphones',
    price: 120.00,
    category_id: 11,
    seller_id: 1,
    description: 'Immerse yourself in music with these high-quality wireless noise-canceling headphones.'
  },
  {
    title: 'Classic Wristwatch',
    price: 70.00,
    category_id: 12,
    seller_id: 1,
    description: 'Enhance your style with this timeless and classic wristwatch.'
  }
]


def create_images_attachments(model_instance, num_images)
  num_images.times do
    image_url = Faker::LoremFlickr.image(size: '300x200', search_terms: ['product'])
    image_file = URI.open(image_url)
    filename = "#{SecureRandom.uuid}.png"
    model_instance.images.attach(io: image_file, filename:)
  end
end

products_data.each do |product_data|
  product = Product.create(product_data)
  create_images_attachments(product, 5)
end
