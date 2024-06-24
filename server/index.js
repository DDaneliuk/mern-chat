import express from "express";
import dotenv from "dotenv";
// db
import connectMongo from './db/index.js';
// routes
import authRoutes from "./routes/auth.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectMongo();
  console.log(`Server started:${PORT}`)
});
