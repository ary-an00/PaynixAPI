const express = require("express");
const cors = require("cors"); // ✅ Import cors
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

// ✅ Use CORS middleware
app.use(cors()); // This will allow requests from all origins

app.use(express.json()); // To parse JSON

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/transaction", transactionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
