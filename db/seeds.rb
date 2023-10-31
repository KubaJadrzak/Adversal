# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)




3.times do

    User.create(
        name: Faker::Name.name,
        email: Faker::Internet.email
    )

    Category.create(
        name: Faker::Lorem.sentence(word_count: 1)
    )
end

40.times do

    Product.create(
        title: Faker::Lorem.sentence(word_count: 3),
        price: Faker::Commerce.price,
        category_id: Faker::Number.between(from: 1, to: 3),
        user_id: Faker::Number.between(from: 1, to: 3),
        description: Faker::Lorem.sentence(word_count: 100)
    )
end