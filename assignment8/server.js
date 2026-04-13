const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
const app = express();

app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/user", userRoutes);
app.use((err, req, res, next) => {
  console.error("Unhandled route error:", err.message);
  if (res.headersSent) return next(err);
  return res.status(500).json({ error: "Internal server error." });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

if (!process.env.MONGO_URI) {
  console.error("DB connection error: MONGO_URI is missing in .env");
} else {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("DB connection error:", err.message));
}
