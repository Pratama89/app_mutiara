CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



SELECT * FROM users;
SELECT * FROM konsumen;

SELECT * FROM users WHERE username = 'pratama89' OR email = 'email_anda';

ALTER TABLE users ADD COLUMN full_name VARCHAR(255);

ALTER TABLE users ADD COLUMN role VARCHAR(255);

ALTER TABLE users ADD COLUMN profile_picture VARCHAR(255);

CREATE TYPE user_role AS ENUM ('Admin', 'Keuangan', 'Manager', 'Sales');
ALTER TABLE users ADD COLUMN role user_role DEFAULT 'Sales';

CREATE TABLE konsumen (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    alamat TEXT NOT NULL,
    kota VARCHAR(50) NOT NULL,
    no_telpon VARCHAR(15),
    email VARCHAR(100),
    tipe_pelanggan VARCHAR(50),
    syarat_pembayaran VARCHAR(100)
);


INSERT INTO konsumen (nama, alamat, kota, no_telpon, email, tipe_pelanggan, syarat_pembayaran)
VALUES 
('PT. ABC', 'Jalan Merdeka No. 1', 'Jakarta', '08123456789', 'abc@example.com', 'Retail', '30 Hari'),
('CV. XYZ', 'Jalan Sudirman No. 12', 'Bandung', '08198765432', 'xyz@example.com', 'Wholesale', 'Cash');
