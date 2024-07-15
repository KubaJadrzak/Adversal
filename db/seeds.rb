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
    country_name: 'United States',
    country_geoname_id: 6252001,  # Example GeonameID for USA
    subdivision_name: 'California',
    subdivision_geoname_id: 5332921,  # Example GeonameID for California
    county_name: 'Los Angeles County',
    county_geoname_id: 5368381,  # Example GeonameID for Los Angeles County
    area_name: 'Los Angeles',
    area_geoname_id: 5368361,  # Example GeonameID for Los Angeles
    postal_code: '90001',
    jti: SecureRandom.uuid 
  },
  { 
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    password: 'password123',
    phone_number: '987-654-3210',
    country_name: 'United States',
    country_geoname_id: 6252001,  # Example GeonameID for USA
    subdivision_name: 'California',
    subdivision_geoname_id: 5332921,  # Example GeonameID for California
    county_name: 'Los Angeles County',
    county_geoname_id: 5368381,  # Example GeonameID for Los Angeles County
    area_name: 'Whittier',
    area_geoname_id: 5409059,  # Example GeonameID for Los Angeles
    postal_code: '90210',
    jti: SecureRandom.uuid 
  },
  { 
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    password: 'password123',
    phone_number: '111-222-3333',
    country_name: 'United States',
    country_geoname_id: 6252001,  # Example GeonameID for USA
    subdivision_name: 'California',
    subdivision_geoname_id: 5332921,  # Example GeonameID for California
    county_name: 'Los Angeles County',
    county_geoname_id: 5368381,  # Example GeonameID for Los Angeles County
    area_name: 'East La Mirada',
    area_geoname_id: 5344987,  # Example GeonameID for Los Angeles
    postal_code: '90006',
    jti: SecureRandom.uuid 
  },
  { 
    name: 'Alice Williams',
    email: 'alice.williams@example.com',
    password: 'password123',
    phone_number: '555-444-3333',
    country_name: 'United States',
    country_geoname_id: 6252001,  # Example GeonameID for USA
    subdivision_name: 'California',
    subdivision_geoname_id: 5332921,  # Example GeonameID for California
    county_name: 'Los Angeles County',
    county_geoname_id: 5368381,  # Example GeonameID for Los Angeles County
    area_name: 'Del Valle',
    area_geoname_id: 5342467,  # Example GeonameID for Los Angeles
    postal_code: '50009',
    jti: SecureRandom.uuid 
  },
]

# Declare the users array to store created user instances
users = []
users_data.each do |user_data|
  user = User.create!(user_data)
  user.update!(confirmed_at: Time.now)
  users << user
end



review_texts = [
  'Excellent cooperation and communication.',
  'Very professional and timely.',
  'Pleasant to work with, highly recommend.',
  'Extremely helpful and knowledgeable.',
  'Great experience overall.',
  'Provided excellent feedback and was very supportive.',
  'Attentive and thorough in work.',
  'Seamless and productive cooperation.',
  'Delivered everything on time and exceeded expectations.',
  'Impeccable attention to detail.',
  'Fantastic collaborator and very reliable.',
  'Easy to work with and very efficient.',
  'Expertise was evident throughout the project.',
  'Leadership made a significant difference.',
  'Creativity brought new life to our project.'
]

# Create reviews such that each user reviews every other user
users.each do |reviewer|
  (users - [reviewer]).each do |subject|
    Review.create!(
      reviewer: reviewer,
      subject: subject,
      text: review_texts.sample,
      rating: rand(3..5) # Random rating between 3 and 5
    )
  end
end



# Seed data for Categories
categories_data = [
  { name: 'Fashion', subcategories: [
    { name: 'Men\'s Clothing' },
    { name: 'Women\'s Clothing' },
    { name: 'Accessories' },
    { name: 'Shoes' },
    { name: 'Bags' },
    { name: 'Jewelry' },
    { name: 'Watches' }
  ] },
  { name: 'Health&Beauty', subcategories: [
    { name: 'Skincare' },
    { name: 'Haircare' },
    { name: 'Makeup' },
    { name: 'Fragrances' },
    { name: 'Oral Care' },
    { name: 'Personal Care' },
    { name: 'Wellness' }
  ] },
  { name: 'Electronics', subcategories: [
    { name: 'Smartphones' },
    { name: 'Laptops' },
    { name: 'Headphones' },
    { name: 'Tablets' },
    { name: 'Cameras' },
    { name: 'Wearable Tech' },
    { name: 'Smart Home Devices' }
  ] },
  { name: 'Automotive', subcategories: [
    { name: 'Car Parts' },
    { name: 'Car Accessories' },
    { name: 'Tools&Equipment' },
    { name: 'Motorcycle Parts' },
    { name: 'Motorcycle Accessories' },
    { name: 'Car Care' },
    { name: 'GPS & Navigation' }
  ] },
  { name: 'Fitness', subcategories: [
    { name: 'Gym Equipment' },
    { name: 'Sportswear' },
    { name: 'Supplements' },
    { name: 'Yoga & Pilates' },
    { name: 'Cardio Equipment' },
    { name: 'Fitness Trackers' },
    { name: 'Outdoor Sports' }
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


products_data = [
  # Men's Clothing (Category ID: 2)
  {
    title: 'Casual T-Shirt',
    price: 20.00,
    category_id: 2,
    seller_id: 1,
    description: 'A comfortable and stylish t-shirt perfect for everyday wear.'
  },
  {
    title: 'Formal Suit',
    price: 250.00,
    category_id: 2,
    seller_id: 2,
    description: 'A sharp and elegant suit, ideal for business meetings and formal events.'
  },
  {
    title: 'Jeans',
    price: 60.00,
    category_id: 2,
    seller_id: 3,
    description: 'A pair of classic blue jeans that never go out of style.'
  },

  # Women's Clothing (Category ID: 3)
  {
    title: 'Summer Dress',
    price: 45.00,
    category_id: 3,
    seller_id: 4,
    description: 'A light and airy dress, perfect for summer days.'
  },
  {
    title: 'Blouse',
    price: 30.00,
    category_id: 3,
    seller_id: 1,
    description: 'A stylish blouse that can be dressed up or down for any occasion.'
  },
  {
    title: 'Evening Gown',
    price: 150.00,
    category_id: 3,
    seller_id: 2,
    description: 'An elegant evening gown for special occasions.'
  },

  # Accessories (Category ID: 4)
  {
    title: 'Leather Wallet',
    price: 35.00,
    category_id: 4,
    seller_id: 3,
    description: 'A sleek leather wallet with multiple compartments.'
  },
  {
    title: 'Sunglasses',
    price: 80.00,
    category_id: 4,
    seller_id: 4,
    description: 'Stylish sunglasses with UV protection.'
  },
  {
    title: 'Scarf',
    price: 25.00,
    category_id: 4,
    seller_id: 1,
    description: 'A warm and cozy scarf for chilly days.'
  },

  # Shoes (Category ID: 5)
  {
    title: 'Running Shoes',
    price: 70.00,
    category_id: 5,
    seller_id: 2,
    description: 'Comfortable and durable running shoes for all terrains.'
  },
  {
    title: 'High Heels',
    price: 90.00,
    category_id: 5,
    seller_id: 3,
    description: 'Elegant high heels for special occasions.'
  },
  {
    title: 'Sandals',
    price: 40.00,
    category_id: 5,
    seller_id: 4,
    description: 'Comfortable and stylish sandals for summer.'
  },

  # Bags (Category ID: 6)
  {
    title: 'Backpack',
    price: 50.00,
    category_id: 6,
    seller_id: 1,
    description: 'A durable backpack with multiple compartments for all your needs.'
  },
  {
    title: 'Handbag',
    price: 75.00,
    category_id: 6,
    seller_id: 2,
    description: 'A stylish handbag perfect for daily use.'
  },
  {
    title: 'Laptop Bag',
    price: 60.00,
    category_id: 6,
    seller_id: 3,
    description: 'A sleek and protective laptop bag for your electronics.'
  },

  # Jewelry (Category ID: 7)
  {
    title: 'Gold Necklace',
    price: 200.00,
    category_id: 7,
    seller_id: 4,
    description: 'An elegant gold necklace that adds a touch of class to any outfit.'
  },
  {
    title: 'Silver Earrings',
    price: 50.00,
    category_id: 7,
    seller_id: 1,
    description: 'Stylish silver earrings that complement any look.'
  },
  {
    title: 'Diamond Ring',
    price: 500.00,
    category_id: 7,
    seller_id: 2,
    description: 'A stunning diamond ring for special occasions.'
  },

  # Watches (Category ID: 8)
  {
    title: 'Sports Watch',
    price: 100.00,
    category_id: 8,
    seller_id: 3,
    description: 'A rugged sports watch with multiple features for the active individual.'
  },
  {
    title: 'Luxury Watch',
    price: 300.00,
    category_id: 8,
    seller_id: 3,
    description: 'A luxurious watch with a timeless design.'
  },
  {
    title: 'Digital Watch',
    price: 50.00,
    category_id: 8,
    seller_id: 4,
    description: 'A modern digital watch with various functionalities.'
  },
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



