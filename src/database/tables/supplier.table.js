export const createSupplierTable = `
  CREATE TABLE IF NOT EXISTS supplier (
    supplier_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    contact_info TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;
