import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import authRouter from "../routes/auth.router.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

// serve CSS/JS/images from the UI folder
app.use(express.static(path.join(__dirname, "../UI")));

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../UI/index.html"));
});

export default app;