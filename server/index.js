import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// db
import connectMongo from './db/index.js';
// routes
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(PORT, () => {
  connectMongo();
  console.log(`Server started:${PORT}`)
});
