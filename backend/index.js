import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend origin
    credentials: true, // Allow cookies to be sent
  })
);
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.listen(3000, async () => {
  console.log("Server running on port 3000");
});
