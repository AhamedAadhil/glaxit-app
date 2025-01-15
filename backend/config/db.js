import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connectDB.connect(function (err) {
  if (err) {
    console.error("Database connection failed:", err.stack);
    process.exit(1);
  }
  console.log("Connected to the database.");
});
