const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

const allowedOrigins = [
  "https://trustpoint.in",
  "https://www.trustpoint.in",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server and tools like curl / Postman
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.warn("❌ Blocked CORS origin:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Enable cookies / auth headers if needed
    optionsSuccessStatus: 204,
  })
);

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
