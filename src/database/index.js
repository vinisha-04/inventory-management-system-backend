import { pool } from "../config/db.js";

import { createUserTable } from "./tables/user.table.js";
import { createCustomerTable } from "./tables/customer.table.js";
import { createProductTable } from "./tables/product.table.js";
import { createStockTable } from "./tables/stock.table.js";
import { createOrdersTable } from "./tables/order.table.js";
import { createOrderItemsTable } from "./tables/orderItem.table.js";
import { createSupplierTable } from "./tables/supplier.table.js";
import { createSupplierProductTable } from "./tables/supplierProduct.table.js";
import { createReportTable } from "./tables/report.table.js";

export const initTables = async () => {
  try {
    await pool.query(createUserTable);
    await pool.query(createCustomerTable);
    await pool.query(createProductTable);
    await pool.query(createStockTable);
    await pool.query(createOrdersTable);
    await pool.query(createOrderItemsTable);
    await pool.query(createSupplierTable);
    await pool.query(createSupplierProductTable);
    await pool.query(createReportTable);

    console.log("All tables created");
  } catch (error) {
    console.error("Table creation failed:", error.message);
    process.exit(1);
  }
};
