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
    country_geoname_id: 6_252_001, # Example GeonameID for USA
    subdivision_name: 'California',
    subdivision_geoname_id: 5_332_921, # Example GeonameID for California
    county_name: 'Los Angeles County',
    county_geoname_id: 5_368_381, # Example GeonameID for Los Angeles County
    area_name: 'Los Angeles',
    area_geoname_id: 5_368_361, # Example GeonameID for Los Angeles
    postal_code: '90001',
    jti: SecureRandom.uuid
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    password: 'password123',
    phone_number: '987-654-3210',
    country_name: 'United States',
    country_geoname_id: 6_252_001, # Example GeonameID for USA
    subdivision_name: 'California',
    subdivision_geoname_id: 5_332_921, # Example GeonameID for California
    county_name: 'Los Angeles County',
    county_geoname_id: 5_368_381, # Example GeonameID for Los Angeles County
    area_name: 'Whittier',
    area_geoname_id: 5_409_059, # Example GeonameID for Los Angeles
    postal_code: '90210',
    jti: SecureRandom.uuid
  },
  {
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    password: 'password123',
    phone_number: '111-222-3333',
    country_name: 'United States',
    country_geoname_id: 6_252_001, # Example GeonameID for USA
    subdivision_name: 'California',
    subdivision_geoname_id: 5_332_921, # Example GeonameID for California
    county_name: 'Los Angeles County',
    county_geoname_id: 5_368_381, # Example GeonameID for Los Angeles County
    area_name: 'East La Mirada',
    area_geoname_id: 5_344_987, # Example GeonameID for Los Angeles
    postal_code: '90006',
    jti: SecureRandom.uuid
  },
  {
    name: 'Alice Williams',
    email: 'alice.williams@example.com',
    password: 'password123',
    phone_number: '555-444-3333',
    country_name: 'United States',
    country_geoname_id: 6_252_001, # Example GeonameID for USA
    subdivision_name: 'California',
    subdivision_geoname_id: 5_332_921, # Example GeonameID for California
    county_name: 'Los Angeles County',
    county_geoname_id: 5_368_381, # Example GeonameID for Los Angeles County
    area_name: 'Del Valle',
    area_geoname_id: 5_342_467, # Example GeonameID for Los Angeles
    postal_code: '50009',
    jti: SecureRandom.uuid
  }
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

users.each do |reviewer|
  (users - [reviewer]).each do |subject|
    Review.create!(
      reviewer:,
      subject:,
      text: review_texts.sample,
      rating: rand(3..5)
    )
  end
end

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
  parent_category = Category.create(name: category_data[:name])

  category_data[:subcategories].each do |subcategory_data|
    parent_category.subcategories.create(name: subcategory_data[:name])
  end
end

products_data = [
  {
    title: 'Adjustable Dumbbell Set',
    price: 250.00,
    category_id: 34,
    seller_id: 1,
    description: 'A versatile dumbbell set with adjustable weights for a customizable workout.'
  },
  {
    title: 'Olympic Barbell',
    price: 180.00,
    category_id: 34,
    seller_id: 2,
    description: 'A durable barbell designed for heavy lifting and strength training.'
  },
  {
    title: 'Home Gym Resistance Bands',
    price: 35.00,
    category_id: 34,
    seller_id: 3,
    description: 'A set of resistance bands for a full-body workout at home or on the go.'
  },
  {
    title: 'Running Shorts',
    price: 30.00,
    category_id: 35,
    seller_id: 4,
    description: 'Breathable and comfortable running shorts designed for maximum mobility.'
  },
  {
    title: 'Compression Leggings',
    price: 40.00,
    category_id: 35,
    seller_id: 1,
    description: 'High-performance leggings that offer support and enhance circulation during workouts.'
  },
  {
    title: 'Performance Tank Top',
    price: 25.00,
    category_id: 35,
    seller_id: 2,
    description: 'A lightweight tank top with moisture-wicking properties for intense workouts.'
  },
  {
    title: 'Whey Protein Powder',
    price: 60.00,
    category_id: 36,
    seller_id: 3,
    description: 'A high-quality whey protein powder to support muscle recovery and growth.'
  },
  {
    title: 'Creatine Monohydrate',
    price: 30.00,
    category_id: 36,
    seller_id: 4,
    description: 'Pure creatine monohydrate to enhance strength and athletic performance.'
  },
  {
    title: 'Multivitamin Tablets',
    price: 20.00,
    category_id: 36,
    seller_id: 1,
    description: 'Daily multivitamin tablets to support overall health and well-being.'
  },
  {
    title: 'Yoga Mat',
    price: 40.00,
    category_id: 37,
    seller_id: 2,
    description: 'A high-density yoga mat with non-slip surface for a comfortable practice.'
  },
  {
    title: 'Pilates Reformer',
    price: 850.00,
    category_id: 37,
    seller_id: 3,
    description: 'A professional Pilates reformer designed for a full range of exercises.'
  },
  {
    title: 'Yoga Block Set',
    price: 25.00,
    category_id: 37,
    seller_id: 4,
    description: 'A set of yoga blocks to assist with various poses and enhance flexibility.'
  },
  {
    title: 'Elliptical Machine',
    price: 700.00,
    category_id: 38,
    seller_id: 1,
    description: 'A smooth and low-impact elliptical machine ideal for cardio workouts.'
  },
  {
    title: 'Treadmill Pro',
    price: 1200.00,
    category_id: 38,
    seller_id: 2,
    description: 'A high-performance treadmill with adjustable speeds and incline settings.'
  },
  {
    title: 'Stationary Bike',
    price: 500.00,
    category_id: 38,
    seller_id: 3,
    description: 'A robust stationary bike with adjustable resistance for effective cardio training.'
  },
  {
    title: 'Smart Fitness Watch',
    price: 200.00,
    category_id: 39,
    seller_id: 4,
    description: 'A fitness watch with advanced tracking features for heart rate, sleep, and activity.'
  },
  {
    title: 'Heart Rate Monitor',
    price: 70.00,
    category_id: 39,
    seller_id: 1,
    description: 'An accurate heart rate monitor to track your fitness and workout intensity.'
  },
  {
    title: 'GPS Running Watch',
    price: 150.00,
    category_id: 39,
    seller_id: 2,
    description: 'A GPS running watch with route tracking and performance analytics.'
  },
  {
    title: 'Mountain Bike',
    price: 450.00,
    category_id: 40,
    seller_id: 3,
    description: 'A durable mountain bike designed for rugged trails and off-road adventures.'
  },
  {
    title: 'Camping Tent',
    price: 120.00,
    category_id: 40,
    seller_id: 4,
    description: 'A spacious and weather-resistant camping tent for outdoor excursions.'
  },
  {
    title: 'Fishing Rod Combo',
    price: 80.00,
    category_id: 40,
    seller_id: 1,
    description: 'A versatile fishing rod combo ideal for various fishing conditions and techniques.'
  },
  {
    title: 'Smartphone X Pro',
    price: 999.00,
    category_id: 18,
    seller_id: 1,
    description: 'A high-performance smartphone with a stunning display and advanced camera system.'
  },
  {
    title: 'Budget Smartphone A',
    price: 299.00,
    category_id: 18,
    seller_id: 2,
    description: 'An affordable smartphone with essential features and good battery life.'
  },
  {
    title: 'Compact Smartphone Mini',
    price: 449.00,
    category_id: 18,
    seller_id: 3,
    description: 'A compact and sleek smartphone perfect for one-handed use.'
  },
  {
    title: 'Ultra-Lightweight Laptop',
    price: 1299.00,
    category_id: 19,
    seller_id: 4,
    description: 'A lightweight laptop with powerful performance and a long battery life.'
  },
  {
    title: 'Gaming Laptop Z',
    price: 1799.00,
    category_id: 19,
    seller_id: 1,
    description: 'A high-end gaming laptop with top-of-the-line graphics and speed.'
  },
  {
    title: 'Budget-Friendly Laptop',
    price: 599.00,
    category_id: 19,
    seller_id: 2,
    description: 'A cost-effective laptop suitable for everyday tasks and light usage.'
  },
  {
    title: 'Noise-Cancelling Headphones',
    price: 299.00,
    category_id: 20,
    seller_id: 3,
    description: 'Premium headphones with active noise-cancellation and superior sound quality.'
  },
  {
    title: 'Wireless Earbuds',
    price: 149.00,
    category_id: 20,
    seller_id: 4,
    description: 'Compact and comfortable wireless earbuds with a secure fit and clear sound.'
  },
  {
    title: 'Sports Headphones',
    price: 119.00,
    category_id: 20,
    seller_id: 1,
    description: 'Sweat-resistant headphones designed for an active lifestyle with high durability.'
  },
  {
    title: '10-Inch Tablet',
    price: 349.00,
    category_id: 21,
    seller_id: 2,
    description: 'A versatile tablet with a large display, ideal for multimedia and productivity.'
  },
  {
    title: 'Premium 12-Inch Tablet',
    price: 599.00,
    category_id: 21,
    seller_id: 3,
    description: 'A high-end tablet with a crisp screen and powerful performance for professional use.'
  },
  {
    title: 'Kids Tablet',
    price: 199.00,
    category_id: 21,
    seller_id: 4,
    description: 'A durable and user-friendly tablet designed specifically for children.'
  },
  {
    title: 'DSLR Camera A',
    price: 799.00,
    category_id: 22,
    seller_id: 1,
    description: 'A versatile DSLR camera with a high-resolution sensor and interchangeable lenses.'
  },
  {
    title: 'Mirrorless Camera X',
    price: 999.00,
    category_id: 22,
    seller_id: 2,
    description: 'A compact mirrorless camera with excellent image quality and video capabilities.'
  },
  {
    title: 'Action Camera Pro',
    price: 349.00,
    category_id: 22,
    seller_id: 3,
    description: 'A rugged action camera perfect for capturing high-quality video in extreme conditions.'
  },
  {
    title: 'Smartwatch Series 5',
    price: 399.00,
    category_id: 23,
    seller_id: 4,
    description: 'A smartwatch with advanced health tracking and seamless connectivity.'
  },
  {
    title: 'Fitness Tracker X',
    price: 149.00,
    category_id: 23,
    seller_id: 1,
    description: 'A sleek fitness tracker with comprehensive workout and health monitoring features.'
  },
  {
    title: 'Smart Ring',
    price: 249.00,
    category_id: 23,
    seller_id: 2,
    description: 'A stylish smart ring that tracks activity and health metrics discreetly.'
  },
  {
    title: 'Smart Home Hub',
    price: 129.00,
    category_id: 24,
    seller_id: 3,
    description: 'A central hub to connect and control all your smart home devices.'
  },
  {
    title: 'Voice-Controlled Smart Speaker',
    price: 99.00,
    category_id: 24,
    seller_id: 4,
    description: 'A smart speaker with voice assistant integration for hands-free control of your smart home.'
  },
  {
    title: 'Smart Light Bulbs (4-Pack)',
    price: 79.00,
    category_id: 24,
    seller_id: 1,
    description: 'A set of smart light bulbs that can be controlled remotely and customized for different moods.'
  },

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
  {
    title: 'Hydrating Facial Serum',
    price: 30.00,
    category_id: 10,
    seller_id: 1,
    description: 'A lightweight serum that provides deep hydration and helps reduce the appearance of fine lines.'
  },
  {
    title: 'Gentle Exfoliating Scrub',
    price: 25.00,
    category_id: 10,
    seller_id: 2,
    description: 'A mild exfoliator that removes dead skin cells and reveals a smoother complexion.'
  },
  {
    title: 'Soothing Night Cream',
    price: 35.00,
    category_id: 10,
    seller_id: 3,
    description: 'A rich, nourishing cream designed to replenish and repair skin while you sleep.'
  },
  {
    title: 'Moisturizing Shampoo',
    price: 18.00,
    category_id: 11,
    seller_id: 4,
    description: 'A hydrating shampoo that cleanses and adds moisture to dry, brittle hair.'
  },
  {
    title: 'Nourishing Hair Mask',
    price: 22.00,
    category_id: 11,
    seller_id: 1,
    description: 'A deep conditioning treatment that restores strength and shine to damaged hair.'
  },
  {
    title: 'Volume Boosting Mousse',
    price: 20.00,
    category_id: 11,
    seller_id: 2,
    description: 'A lightweight mousse that adds volume and body to fine, flat hair.'
  },
  {
    title: 'Long-Wear Foundation',
    price: 25.00,
    category_id: 12,
    seller_id: 3,
    description: 'A full-coverage foundation that provides a flawless finish and lasts all day.'
  },
  {
    title: 'Volumizing Mascara',
    price: 15.00,
    category_id: 12,
    seller_id: 4,
    description: 'A mascara that adds length and volume to lashes for a dramatic look.'
  },
  {
    title: 'Matte Lipstick',
    price: 18.00,
    category_id: 12,
    seller_id: 1,
    description: 'A richly pigmented lipstick that delivers a bold, matte finish with long-lasting wear.'
  },
  {
    title: 'Citrus Breeze Eau de Toilette',
    price: 45.00,
    category_id: 13,
    seller_id: 2,
    description: 'A refreshing fragrance with notes of lemon, lime, and orange for a zesty, invigorating scent.'
  },
  {
    title: 'Elegant Rose Perfume',
    price: 55.00,
    category_id: 13,
    seller_id: 3,
    description: 'A sophisticated perfume featuring the delicate scent of fresh roses blended with hints of vanilla.'
  },
  {
    title: 'Mystic Woods Cologne',
    price: 50.00,
    category_id: 13,
    seller_id: 4,
    description: 'A deep, earthy cologne with notes of sandalwood, cedar, and a touch of musk.'
  },
  {
    title: 'Whitening Toothpaste',
    price: 8.00,
    category_id: 14,
    seller_id: 1,
    description: 'A toothpaste that effectively whitens teeth while protecting against cavities.'
  },
  {
    title: 'Minty Mouthwash',
    price: 10.00,
    category_id: 14,
    seller_id: 2,
    description: 'A mouthwash that provides a refreshing mint flavor and helps kill bacteria for a clean mouth.'
  },
  {
    title: 'Electric Toothbrush',
    price: 45.00,
    category_id: 14,
    seller_id: 3,
    description: 'An advanced electric toothbrush that provides a superior clean with multiple brushing modes.'
  },
  {
    title: 'Luxurious Body Lotion',
    price: 12.00,
    category_id: 15,
    seller_id: 4,
    description: 'A rich lotion that hydrates and softens skin, leaving it feeling smooth and supple.'
  },
  {
    title: 'All-Natural Deodorant',
    price: 10.00,
    category_id: 15,
    seller_id: 1,
    description: 'A deodorant made with natural ingredients that offers long-lasting protection without harsh chemicals.'
  },
  {
    title: 'Relaxing Bath Salts',
    price: 15.00,
    category_id: 15,
    seller_id: 2,
    description: 'Bath salts infused with essential oils to help you unwind and soothe tired muscles.'
  },
  {
    title: 'Herbal Sleep Tea',
    price: 12.00,
    category_id: 16,
    seller_id: 3,
    description: 'A calming tea blend that promotes restful sleep and relaxation before bedtime.'
  },
  {
    title: 'Daily Multivitamins',
    price: 20.00,
    category_id: 16,
    seller_id: 4,
    description: 'A comprehensive multivitamin supplement that supports overall health and well-being.'
  },
  {
    title: 'Aromatherapy Diffuser',
    price: 30.00,
    category_id: 16,
    seller_id: 1,
    description: 'An essential oil diffuser that helps create a calming atmosphere with your favorite scents.'
  },
  {
    title: 'Smartphone X Pro',
    price: 999.00,
    category_id: 18,
    seller_id: 1,
    description: 'A high-performance smartphone with a stunning display and advanced camera system.'
  },
  {
    title: 'Budget Smartphone A',
    price: 299.00,
    category_id: 18,
    seller_id: 2,
    description: 'An affordable smartphone with essential features and good battery life.'
  },
  {
    title: 'Compact Smartphone Mini',
    price: 449.00,
    category_id: 18,
    seller_id: 3,
    description: 'A compact and sleek smartphone perfect for one-handed use.'
  },
  {
    title: 'Ultra-Lightweight Laptop',
    price: 1299.00,
    category_id: 19,
    seller_id: 4,
    description: 'A lightweight laptop with powerful performance and a long battery life.'
  },
  {
    title: 'Gaming Laptop Z',
    price: 1799.00,
    category_id: 19,
    seller_id: 1,
    description: 'A high-end gaming laptop with top-of-the-line graphics and speed.'
  },
  {
    title: 'Budget-Friendly Laptop',
    price: 599.00,
    category_id: 19,
    seller_id: 2,
    description: 'A cost-effective laptop suitable for everyday tasks and light usage.'
  },
  {
    title: 'Noise-Cancelling Headphones',
    price: 299.00,
    category_id: 20,
    seller_id: 3,
    description: 'Premium headphones with active noise-cancellation and superior sound quality.'
  },
  {
    title: 'Wireless Earbuds',
    price: 149.00,
    category_id: 20,
    seller_id: 4,
    description: 'Compact and comfortable wireless earbuds with a secure fit and clear sound.'
  },
  {
    title: 'Sports Headphones',
    price: 119.00,
    category_id: 20,
    seller_id: 1,
    description: 'Sweat-resistant headphones designed for an active lifestyle with high durability.'
  },
  {
    title: '10-Inch Tablet',
    price: 349.00,
    category_id: 21,
    seller_id: 2,
    description: 'A versatile tablet with a large display, ideal for multimedia and productivity.'
  },
  {
    title: 'Premium 12-Inch Tablet',
    price: 599.00,
    category_id: 21,
    seller_id: 3,
    description: 'A high-end tablet with a crisp screen and powerful performance for professional use.'
  },
  {
    title: 'Kids Tablet',
    price: 199.00,
    category_id: 21,
    seller_id: 4,
    description: 'A durable and user-friendly tablet designed specifically for children.'
  },
  {
    title: 'DSLR Camera A',
    price: 799.00,
    category_id: 22,
    seller_id: 1,
    description: 'A versatile DSLR camera with a high-resolution sensor and interchangeable lenses.'
  },
  {
    title: 'Mirrorless Camera X',
    price: 999.00,
    category_id: 22,
    seller_id: 2,
    description: 'A compact mirrorless camera with excellent image quality and video capabilities.'
  },
  {
    title: 'Action Camera Pro',
    price: 349.00,
    category_id: 22,
    seller_id: 3,
    description: 'A rugged action camera perfect for capturing high-quality video in extreme conditions.'
  },
  {
    title: 'Smartwatch Series 5',
    price: 399.00,
    category_id: 23,
    seller_id: 4,
    description: 'A smartwatch with advanced health tracking and seamless connectivity.'
  },
  {
    title: 'Fitness Tracker X',
    price: 149.00,
    category_id: 23,
    seller_id: 1,
    description: 'A sleek fitness tracker with comprehensive workout and health monitoring features.'
  },
  {
    title: 'Smart Ring',
    price: 249.00,
    category_id: 23,
    seller_id: 2,
    description: 'A stylish smart ring that tracks activity and health metrics discreetly.'
  },
  {
    title: 'Smart Home Hub',
    price: 129.00,
    category_id: 24,
    seller_id: 3,
    description: 'A central hub to connect and control all your smart home devices.'
  },
  {
    title: 'Voice-Controlled Smart Speaker',
    price: 99.00,
    category_id: 24,
    seller_id: 4,
    description: 'A smart speaker with voice assistant integration for hands-free control of your smart home.'
  },
  {
    title: 'Smart Light Bulbs (4-Pack)',
    price: 79.00,
    category_id: 24,
    seller_id: 1,
    description: 'A set of smart light bulbs that can be controlled remotely and customized for different moods.'
  }, {
    title: 'High-Performance Brake Pads',
    price: 120.00,
    category_id: 26,
    seller_id: 1,
    description: 'Durable brake pads designed for high performance and safety.'
  },
  {
    title: 'Radiator Hose Kit',
    price: 85.00,
    category_id: 26,
    seller_id: 2,
    description: 'A complete radiator hose kit for efficient cooling system performance.'
  },
  {
    title: 'Premium Air Filter',
    price: 45.00,
    category_id: 26,
    seller_id: 3,
    description: 'High-quality air filter that ensures optimal engine performance and fuel efficiency.'
  },
  {
    title: 'Leather Steering Wheel Cover',
    price: 30.00,
    category_id: 27,
    seller_id: 4,
    description: 'A stylish leather steering wheel cover that adds comfort and grip.'
  },
  {
    title: 'Custom Floor Mats',
    price: 50.00,
    category_id: 27,
    seller_id: 1,
    description: 'High-quality, custom-fit floor mats to protect your vehicle’s interior.'
  },
  {
    title: 'Portable Car Vacuum',
    price: 60.00,
    category_id: 27,
    seller_id: 2,
    description: 'A compact and powerful vacuum cleaner for easy car cleaning.'
  },
  {
    title: 'Cordless Drill Set',
    price: 150.00,
    category_id: 28,
    seller_id: 3,
    description: 'A versatile cordless drill set for various DIY and professional tasks.'
  },
  {
    title: 'Heavy-Duty Tool Box',
    price: 100.00,
    category_id: 28,
    seller_id: 4,
    description: 'A durable and spacious tool box for organizing and storing your tools.'
  },
  {
    title: 'Adjustable Wrench Set',
    price: 45.00,
    category_id: 28,
    seller_id: 1,
    description: 'A set of adjustable wrenches designed for versatility and precision.'
  },
  {
    title: 'High-Performance Motorcycle Tires',
    price: 200.00,
    category_id: 29,
    seller_id: 2,
    description: 'Durable motorcycle tires designed for excellent traction and safety.'
  },
  {
    title: 'Motorcycle Chain and Sprocket Kit',
    price: 120.00,
    category_id: 29,
    seller_id: 3,
    description: 'A complete chain and sprocket kit for smooth and reliable motorcycle performance.'
  },
  {
    title: 'Aftermarket Motorcycle Exhaust',
    price: 250.00,
    category_id: 29,
    seller_id: 4,
    description: 'An aftermarket exhaust system that enhances performance and sound.'
  },
  {
    title: 'Motorcycle Handlebar Grips',
    price: 40.00,
    category_id: 30,
    seller_id: 1,
    description: 'Comfortable handlebar grips designed for a secure and comfortable ride.'
  },
  {
    title: 'Motorcycle Tank Bag',
    price: 70.00,
    category_id: 30,
    seller_id: 2,
    description: 'A convenient tank bag with ample storage for essentials during your rides.'
  },
  {
    title: 'Motorcycle Windshield',
    price: 120.00,
    category_id: 30,
    seller_id: 3,
    description: 'A high-quality windshield that provides protection from wind and debris.'
  },
  {
    title: 'Car Wax Kit',
    price: 35.00,
    category_id: 31,
    seller_id: 4,
    description: 'A complete wax kit for maintaining your car’s shine and protection.'
  },
  {
    title: 'Interior Cleaner Spray',
    price: 25.00,
    category_id: 31,
    seller_id: 1,
    description: 'An effective interior cleaner spray for keeping your car’s interior spotless.'
  },
  {
    title: 'Tire Repair Kit',
    price: 20.00,
    category_id: 31,
    seller_id: 2,
    description: 'A handy tire repair kit for quick fixes and emergency situations.'
  },
  {
    title: 'Portable GPS Navigation System',
    price: 150.00,
    category_id: 32,
    seller_id: 3,
    description: 'A reliable GPS navigation system with clear maps and real-time traffic updates.'
  },
  {
    title: 'In-Dash Navigation System',
    price: 300.00,
    category_id: 32,
    seller_id: 4,
    description: 'An advanced in-dash navigation system with touch screen and multimedia features.'
  },
  {
    title: 'Handheld GPS Device',
    price: 120.00,
    category_id: 32,
    seller_id: 1,
    description: 'A compact handheld GPS device perfect for hiking and off-road navigation.'
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
