const express = require("express");
const Message = require("../models/Message");

const router = express.Router();

// 채팅 기록 조회
router.get("/:senderId/:receiverId", async (req, res) => {
    const { senderId, receiverId } = req.params;
    try {
        const messages = await Message.find({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId },
            ],
        }).sort({ timestamp: 1 });

        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ error: "채팅 기록 조회 실패", details: err.message });
    }
});

module.exports = router;
