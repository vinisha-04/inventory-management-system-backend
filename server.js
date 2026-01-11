import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import { initTables } from "./src/database/index.js";

await connectDB();
await initTables();

app.listen(5000, () => {
    console.log("Server running on port 5000");
});