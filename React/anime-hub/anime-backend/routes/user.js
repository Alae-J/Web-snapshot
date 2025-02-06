// routes/user.js
const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");
const router = express.Router();

// POST /api/user/favorites
router.post("/favorites", auth, async (req, res, next) => {
    const { anime } = req.body;
    try {
        const user = await User.findById(req.user.id);
        const exists = user.favorites.some((fav) => fav.mal_id === anime.mal_id);
        if (!exists) {
            user.favorites.push(anime);
            await user.save();
            
            // Emit Socket.io event for favorite added
            const io = req.app.get("io");
            io.emit("favoriteAdded", { userId: req.user.id, anime });
        }
        res.json(user.favorites);
    } catch (error) {
        next(error);
    }
});

// GET /api/user/favorites
router.get("/favorites", auth, async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user.favorites);
    } catch (error) {
        next(error);
    }
});

// DELETE /api/user/favorites/:mal_id
router.delete("/favorites/:mal_id", auth, async (req, res, next) => {
    const mal_id = parseInt(req.params.mal_id, 10);
    try {
        const user = await User.findById(req.user.id);
        user.favorites = user.favorites.filter((fav) => fav.mal_id !== mal_id);
        await user.save();
        
        // Emit Socket.io event for favorite removed
        const io = req.app.get("io");
        io.emit("favoriteRemoved", { userId: req.user.id, mal_id });
        
        res.json(user.favorites);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
