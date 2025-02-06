// routes/anime.js
const express = require("express");
const axios = require("axios");
const NodeCache = require("node-cache");
const router = express.Router();

// Set up cache with a TTL of 300 seconds (5 minutes)
const cache = new NodeCache({ stdTTL: 300 });

// GET /api/anime/search?q=&page=&genre=&rating=&status=
router.get("/search", async (req, res, next) => {
    try {
        const { q, page = 1, genre, rating, status } = req.query;
        const cacheKey = `anime-${q}-${page}-${genre}-${rating}-${status}`;
        const cachedData = cache.get(cacheKey);
        if (cachedData) return res.json(cachedData);
        
        const response = await axios.get(
            `https://api.jikan.moe/v4/anime?q=${q}&page=${page}&genre=${genre}&rating=${rating}&status=${status}`
        );
        cache.set(cacheKey, response.data);
        res.json(response.data);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
