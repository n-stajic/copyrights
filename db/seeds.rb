clerk = User.find_by(email: "jack@example.com") 
if clerk.nil?
    clerk = User.create!(
        email: "jack@example.com",
        username: "jack",
        password: "password123",
        first_name: "Jack",
        last_name: "Reacher",
        user_type: User::CLERK
    )

    puts "Created clerk user"
end

citizen = User.find_by(email: "john@example.com")
if citizen.nil?
    citizen = User.create!(
        email: "john@example.com",
        username: "john",
        password: "password123",
        first_name: "John",
        last_name: "Smith",
        user_type: User::CITIZEN
    )

    puts "Created citizen user"
end

if A1Form.find_by(form_number: "A-10000000").nil?
    A1Form.create!(
        form_number: "A-10000000",
        submitter: "John",
        pseudonym: "J",
        proxy: "John M",
        art_title: "Zuta kuca",
        art_data: "John-ov rad",
        art_type: "slika",
        art_format: "slika",
        author_data: "John Smith",
        created_during_employment: "Posao",
        use_intentions: "Izlozba",
        aditional_data: "Dodatan opis",
        user: citizen
    )
end

if A1Form.find_by(form_number: "A-10000001").nil?
    A1Form.create!(
        form_number: "A-10000001",
        submitter: "John",
        pseudonym: "J",
        art_title: "Cadjava mehana",
        art_data: "John-ov rad",
        art_type: "pesma",
        art_format: "pesma",
        author_data: "John Smith",
        use_intentions: "Knjiga",
        aditional_data: "Dodatan opis",
        status: A1Form::APPROVED,
        processed_at: DateTime.current,
        comment: "Odobreno",
        user: citizen,
        processed_by: clerk
    )
end

if A1Form.find_by(form_number: "A-10000002").nil?
    A1Form.create!(
        form_number: "A-10000002",
        submitter: "John",
        pseudonym: "J",
        proxy: "John M",
        art_title: "Zuta kucica",
        art_data: "John-ov rad",
        art_type: "pesma",
        art_format: "pesma",
        author_data: "John Smith",
        use_intentions: "Knjiga",
        aditional_data: "Dodatan opis",
        status: A1Form::REJECTED,
        processed_at: DateTime.current,
        comment: "Odbijeno",
        user: citizen,
        processed_by: clerk
    )
end
