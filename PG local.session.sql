CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



SELECT * FROM users;

SELECT * FROM users WHERE username = 'pratama89' OR email = 'email_anda';

ALTER TABLE users ADD COLUMN full_name VARCHAR(255);

ALTER TABLE users ADD COLUMN role VARCHAR(255);

ALTER TABLE users ADD COLUMN profile_picture VARCHAR(255);

CREATE TYPE user_role AS ENUM ('Admin', 'Keuangan', 'Manager', 'Sales');
ALTER TABLE users ADD COLUMN role user_role DEFAULT 'Sales';
