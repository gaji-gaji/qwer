const express = require("express");
const Market = require("../models/Market");

const router = express.Router();

// 마켓 상품 등록
router.post("/:category", async (req, res) => {
    const { category } = req.params;
    const { name, price, description } = req.body;
    try {
        const newItem = new Market({ category, name, price, description });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(500).json({ error: "상품 등록 실패", details: err.message });
    }
});

// 마켓 상품 조회 (검색 필터 포함)
router.get("/:category", async (req, res) => {
    const { category } = req.params;
    const { keyword } = req.query;
    try {
        const query = { category };
        if (keyword) {
            query.name = { $regex: keyword, $options: "i" }; // 상품 이름 검색
        }

        const items = await Market.find(query);
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: "상품 조회 실패", details: err.message });
    }
});

module.exports = router;
