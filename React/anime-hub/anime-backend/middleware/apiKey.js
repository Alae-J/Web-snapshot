// middleware/apiKey.js
module.exports = function (req, res, next) {
    const apiKey = req.headers["x-api-key"];
    if (!apiKey || apiKey !== process.env.NOTIFICATION_API_KEY) {
        return res.status(401).json({ error: "Unauthorized: Invalid API Key" });
    }
    next();
};
