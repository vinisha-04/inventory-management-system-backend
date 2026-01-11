export const createReportTable = `
  CREATE TABLE IF NOT EXISTS report (
    report_id SERIAL PRIMARY KEY,
    report_type VARCHAR(30)
      CHECK (report_type IN ('INVENTORY', 'ORDER', 'SUPPLIER')),
    start_date DATE,
    end_date DATE,
    data JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;
