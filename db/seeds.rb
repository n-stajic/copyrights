if User.find_by(email:"jack@example.com").nil?
    User.create!(
        email: "jack@example.com",
        username: "jack",
        password: "password123",
        first_name: "Jack",
        last_name: "Reacher",
        user_type: "clerk"
    )

    puts "Created clerk user"
end
