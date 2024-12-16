const mongoose = require("mongoose");

const MarketSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ["music", "books", "games"], required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Market", MarketSchema);
