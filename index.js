const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

/* =========================
   🔥 FORCE CORS (NODE 22 SAFE)
   ========================= */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://trustpoint.in");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  // ⚠️ NO app.options("*") in Node 22
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

/* =========================
   BODY PARSERS
   ========================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   ROUTES
   ========================= */
const authRoutes = require("./Routes/authRouter");
const userRoutes = require("./Routes/userRouter");

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

/* =========================
   MONGODB
   ========================= */
mongoose
  .connect(process.env.MONGO_CONN)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

/* =========================
   SERVER
   ========================= */
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
