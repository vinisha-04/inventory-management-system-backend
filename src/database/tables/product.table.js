export const createProductTable = `
  CREATE TABLE IF NOT EXISTS product (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock_level INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;
