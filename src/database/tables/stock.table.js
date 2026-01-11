export const createStockTable = `
  CREATE TABLE IF NOT EXISTS stock (
    product_id INT PRIMARY KEY,
    quantity INT NOT NULL,
    reorder_level INT NOT NULL,
    CONSTRAINT fk_stock_product
      FOREIGN KEY (product_id)
      REFERENCES product(product_id)
      ON DELETE CASCADE
  );
`;
