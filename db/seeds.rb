# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


users_data = [
  { name: "John Doe", email: "john.doe@example.com" },
  { name: "Jane Smith", email: "jane.smith@example.com" },
  { name: "Bob Johnson", email: "bob.johnson@example.com" },
  { name: "Alice Williams", email: "alice.williams@example.com" },
  { name: "Charlie Brown", email: "charlie.brown@example.com" },
  { name: "Eva Davis", email: "eva.davis@example.com" }
]

users_data.each do |user_data|
  User.create(user_data)
end

# Seed data for Categories
categories_data = [
  { name: 'Camping', icon: 'faCar' },
  { name: 'Furniture', icon: 'faCouch' },
  { name: 'Electronics', icon: 'faTV' },
  { name: 'Appliances', icon: 'faBlenderPhone' },
  { name: 'Clothes', icon: 'faShirt' }
]

categories_data.each do |category_data|
  Category.create(category_data)
end

# Seed data for Products
products_data = [
  {
    title: "Luxury Sedan",
    price: 50000.00,
    category_id: 1, # Assuming 'Car' category has an id of 1
    seller_id: 1,   # Assuming 'John Doe' is the seller with an id of 1
    description: "A sleek and luxurious sedan for your comfortable rides."
  },
  {
    title: "Modern Sofa Set",
    price: 1500.00,
    category_id: 2, # Assuming 'Furniture' category has an id of 2
    seller_id: 3,   # Assuming 'Bob Johnson' is the seller with an id of 3
    description: "Upgrade your living room with this stylish and comfortable sofa set."
  },
  {
    title: "Smart LED TV",
    price: 800.00,
    category_id: 3, # Assuming 'Electronics' category has an id of 3
    seller_id: 2,   # Assuming 'Jane Smith' is the seller with an id of 2
    description: "Experience high-definition entertainment with this state-of-the-art smart LED TV."
  },
  {
    title: "Stainless Steel Refrigerator",
    price: 1200.00,
    category_id: 4, # Assuming 'Appliances' category has an id of 4
    seller_id: 4,   # Assuming 'Alice Williams' is the seller with an id of 4
    description: "Keep your food fresh and organized with this spacious stainless steel refrigerator."
  },
  {
    title: "Casual Denim Jacket",
    price: 80.00,
    category_id: 5, # Assuming 'Clothes' category has an id of 5
    seller_id: 5,   # Assuming 'Charlie Brown' is the seller with an id of 5
    description: "A stylish and comfortable denim jacket for your casual outings."
  },
  {
    title: "Gaming Laptop",
    price: 2000.00,
    category_id: 3,
    seller_id: 1,
    description: "Powerful gaming laptop with high-performance graphics for an immersive gaming experience."
  },
  {
    title: "Vintage Coffee Table",
    price: 300.00,
    category_id: 2,
    seller_id: 6,   # Assuming 'Eva Davis' is the seller with an id of 6
    description: "Add a touch of elegance to your living space with this vintage coffee table."
  },
  {
    title: "Mountain Biking Gear Set",
    price: 350.00,
    category_id: 5,
    seller_id: 3,
    description: "Equip yourself for thrilling mountain biking adventures with this comprehensive gear set."
  },
  {
    title: "Robot Vacuum Cleaner",
    price: 250.00,
    category_id: 4,
    seller_id: 2,
    description: "Make cleaning a breeze with this advanced robot vacuum cleaner."
  },
  {
    title: "Professional DSLR Camera",
    price: 1500.00,
    category_id: 3,
    seller_id: 5,
    description: "Capture stunning moments with this high-performance professional DSLR camera."
  },
  {
    title: "Vintage Leather Armchair",
    price: 500.00,
    category_id: 2,
    seller_id: 1,
    description: "Relax in style with this luxurious vintage leather armchair for your home."
  },
  {
    title: "Formal Business Suit",
    price: 300.00,
    category_id: 5,
    seller_id: 4,
    description: "Look sharp and professional in this elegant formal business suit."
  },
  {
    title: "Home Theater System",
    price: 1200.00,
    category_id: 3,
    seller_id: 6,
    description: "Transform your living room into a cinematic experience with this home theater system."
  },
  {
    title: "Portable Bluetooth Speaker",
    price: 50.00,
    category_id: 3,
    seller_id: 2,
    description: "Enjoy music on the go with this compact and powerful portable Bluetooth speaker."
  },
  {
    title: "Designer Coffee Mug Set",
    price: 40.00,
    category_id: 4,
    seller_id: 3,
    description: "Sip your favorite beverages in style with this designer coffee mug set."
  },
  {
    title: "Fitness Tracker Watch",
    price: 80.00,
    category_id: 3,
    seller_id: 5,
    description: "Stay fit and motivated with this feature-packed fitness tracker watch."
  },
  {
    title: "Retro Vinyl Record Player",
    price: 150.00,
    category_id: 2,
    seller_id: 1,
    description: "Bring back the nostalgic sound of vinyl with this retro vinyl record player."
  },
  {
    title: "Outdoor Camping Tent",
    price: 200.00,
    category_id: 1,
    seller_id: 4,
    description: "Experience the great outdoors with this spacious and durable camping tent."
  },
  {
    title: "Classic Leather Handbag",
    price: 120.00,
    category_id: 5,
    seller_id: 6,
    description: "Complete your look with this timeless and elegant classic leather handbag."
  },
  {
    title: "Wireless Noise-Canceling Headphones",
    price: 120.00,
    category_id: 3,
    seller_id: 2,
    description: "Immerse yourself in music with these high-quality wireless noise-canceling headphones."
  },
  {
    title: "Gourmet Kitchen Knife Set",
    price: 100.00,
    category_id: 4,
    seller_id: 3,
    description: "Upgrade your kitchen with this professional-grade gourmet knife set."
  },
  {
    title: "Digital Drawing Tablet",
    price: 180.00,
    category_id: 3,
    seller_id: 5,
    description: "Unleash your creativity with this advanced digital drawing tablet for artists and designers."
  },
  {
    title: "Antique Brass Floor Lamp",
    price: 250.00,
    category_id: 2,
    seller_id: 1,
    description: "Add a touch of vintage charm to your home with this elegant antique brass floor lamp."
  },
  {
    title: "Wireless Charging Pad",
    price: 30.00,
    category_id: 4,
    seller_id: 4,
    description: "Simplify your charging experience with this convenient wireless charging pad for smartphones."
  },
  {
    title: "Classic Wristwatch",
    price: 70.00,
    category_id: 5,
    seller_id: 6,
    description: "Enhance your style with this timeless and classic wristwatch."
  },
  {
    title: "Smart Thermostat",
    price: 80.00,
    category_id: 4,
    seller_id: 2,
    description: "Efficiently control the temperature of your home with this smart thermostat."
  },
  {
    title: "Portable Espresso Maker",
    price: 60.00,
    category_id: 2,
    seller_id: 3,
    description: "Enjoy a perfect cup of espresso anywhere with this portable espresso maker."
  },
  {
    title: "Durable Hiking Backpack",
    price: 100.00,
    category_id: 1,
    seller_id: 5,
    description: "Embark on your outdoor adventures with this durable and spacious hiking backpack."
  },
  {
    title: "Solar-Powered Outdoor Lights",
    price: 40.00,
    category_id: 4,
    seller_id: 1,
    description: "Illuminate your garden with these eco-friendly solar-powered outdoor lights."
  },
  {
    title: "Graphic Design Software Suite",
    price: 300.00,
    category_id: 3,
    seller_id: 4,
    description: "Unleash your creativity with this comprehensive graphic design software suite."
  },
  {
    title: "Mid-Century Modern Armchair",
    price: 180.00,
    category_id: 2,
    seller_id: 6,
    description: "Add a touch of mid-century modern style to your home with this comfortable armchair."
  },
  # Add more hand-generated data for other products...
]

products_data.each do |product_data|
  Product.create(product_data)
end