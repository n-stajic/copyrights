db.createUser(
    {
        user: "copyrightsdb",
        pwd: "password123",
        roles: [
            {
                role: "readWrite",
                db: "copyrights_development"
            }
        ]
    }
);
