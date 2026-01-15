import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";

import connectDB from "./src/config/db.js";
import { initSocket } from "./src/config/socket.js";

import authRoutes from "./src/routes/auth.routes.js";
import gigRoutes from "./src/routes/gig.routes.js";
import bidRoutes from "./src/routes/bid.routes.js";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

initSocket(server);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/bids", bidRoutes);

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
