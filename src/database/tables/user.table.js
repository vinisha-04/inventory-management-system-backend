export const createUserTable = `
  CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(20) CHECK (role IN ('ADMIN', 'MANAGER', 'STAFF')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;
