export const createSupplierProductTable = `
  CREATE TABLE IF NOT EXISTS supplier_product (
    supplier_id INT NOT NULL,
    product_id INT NOT NULL,
    PRIMARY KEY (supplier_id, product_id),
    CONSTRAINT fk_supplier
      FOREIGN KEY (supplier_id)
      REFERENCES supplier(supplier_id),
    CONSTRAINT fk_product_supplier
      FOREIGN KEY (product_id)
      REFERENCES product(product_id)
  );
`;
