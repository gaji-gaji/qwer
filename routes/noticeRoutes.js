const express = require("express");
const Notice = require("../models/Notice");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const notices = await Notice.find();
        res.status(200).json(notices);
    } catch (err) {
        res.status(500).json({ error: "공지사항 조회 실패", details: err.message });
    }
});

router.post("/", async (req, res) => {
    const { title, content } = req.body;
    try {
        const newNotice = new Notice({ title, content });
        await newNotice.save();
        res.status(201).json(newNotice);
    } catch (err) {
        res.status(400).json({ error: "공지사항 등록 실패", details: err.message });
    }
});

module.exports = router;
