// routes/notify.js
const express = require("express");
const router = express.Router();
const apiKeyMiddleware = require("../middleware/apiKey");

// POST /api/notify
router.post("/", apiKeyMiddleware, (req, res, next) => {
    const { message, type } = req.body; // e.g. type: "info", "warning", "error"
    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }
    const io = req.app.get("io");
    io.emit("notification", { message, type: type || "info", timestamp: Date.now() });
    res.json({ status: "Notification sent" });
});

module.exports = router;
