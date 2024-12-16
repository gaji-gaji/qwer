const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB 연결
connectDB();

// API 라우터 등록
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/notices", require("./routes/noticeRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/market", require("./routes/marketRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));

module.exports = app;
