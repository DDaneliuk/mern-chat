import path from "path";
import express from "express";
import { app, server } from "./socket/socket.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// db
import connectMongo from './db/index.js';
// routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.route.js";
import messageRoutes from "./routes/message.routes.js";

const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"))
})

server.listen(PORT, () => {
  connectMongo();
  console.log(`Server started:${PORT}`)
});
