const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

// 게시글 생성
router.post("/:category", async (req, res) => {
    const { category } = req.params;
    const { title, content } = req.body;
    try {
        const newPost = new Post({ category, title, content });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ error: "게시글 생성 실패", details: err.message });
    }
});

// 게시글 조회 (검색 필터 포함)
router.get("/:category", async (req, res) => {
    const { category } = req.params;
    const { keyword } = req.query;
    try {
        const query = { category };
        if (keyword) {
            query.title = { $regex: keyword, $options: "i" }; // 대소문자 구분 없이 검색
        }

        const posts = await Post.find(query);
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: "게시글 조회 실패", details: err.message });
    }
});

module.exports = router;
