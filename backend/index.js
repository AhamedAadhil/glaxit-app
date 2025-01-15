import express from "express";

import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(3000, async () => {
  console.log("Server running on port 3000");
});
