const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

/* =========================
   ✅ CORS CONFIG (FINAL)
   ========================= */
const allowedOrigins = [
  "https://trustpoint.in",
  "http://localhost:5173",
  "http://localhost:5174"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow Postman / server-to-server requests
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Preflight support
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
  .catch((err) => console.error("❌ MongoDB error:", err));

/* =========================
   ✅ SERVER START
   ========================= */
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
