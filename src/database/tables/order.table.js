export const createOrdersTable = `
CREATE TABLE IF NOT EXISTS orders (
  order_id SERIAL PRIMARY KEY,
  customer_id INT NOT NULL,
  status VARCHAR(20) DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_orders_customer
    FOREIGN KEY (customer_id)
    REFERENCES customers(customer_id)
    ON DELETE CASCADE
);
`;
