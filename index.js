const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

/* =========================
   ✅ CORS CONFIG (FIXED)
   ========================= */
app.use(cors({
  origin: [
    "https://trustpoint.in",          // ✅ LIVE FRONTEND
    "http://localhost:5173",
    "http://localhost:5174"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// 👇 important for preflight requests
app.options("*", cors());

/* =========================
   ✅ BODY PARSERS
   ========================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   ✅ ROUTES
   ========================= */
const authRoutes = require("./Routes/authRouter");
const userRoutes = require("./Routes/userRouter");

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

/* =========================
   ✅ MONGODB CONNECTION
   ========================= */
mongoose
  .connect(process.env.MONGO_CONN)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB error:", err));

/* =========================
   ✅ SERVER START
   ========================= */
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
