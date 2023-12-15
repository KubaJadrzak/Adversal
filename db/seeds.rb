# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


6.times do |x|

    User.create(
        name: Faker::Name.name,
        email: Faker::Internet.email
    )

end

category_names = ['car', 'furniture', 'electronics', 'appliances', 'clothes']
category_icons = ['faCar', 'faCouch', 'faTV', 'faBlenderPhone', 'faShirt']

category_names.each_with_index do |name, index|
  Category.create(
    name: name,
    icon: category_icons[index]
  )
end



30.times do |x|

    Product.create(
        title: Faker::Lorem.sentence(word_count: 6),
        price: Faker::Commerce.price,
        category_id: Faker::Number.between(from: 1, to: 6),
        seller_id: Faker::Number.between(from: 1, to: 6),
        description: Faker::Lorem.sentence(word_count: 100)
    )

end
