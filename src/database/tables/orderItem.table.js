export const createOrderItemsTable = `
CREATE TABLE IF NOT EXISTS order_items (
  order_item_id SERIAL PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL CHECK (quantity > 0),
  price_at_order NUMERIC(10,2) NOT NULL,

  CONSTRAINT fk_order_items_order
    FOREIGN KEY (order_id)
    REFERENCES orders(order_id)
    ON DELETE CASCADE,

  CONSTRAINT fk_order_items_product
    FOREIGN KEY (product_id)
    REFERENCES product(product_id)
);
`;
