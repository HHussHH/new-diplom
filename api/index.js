import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import linkRoutes from "./routes/newLink.js";

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/links", linkRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
