// models/User.js
const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
    mal_id: { type: Number, required: true },
    title: { type: String, required: true },
    image_url: { type: String, required: true },
});

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email:    { type: String, required: true, unique: true },
        password: { type: String, required: true },
        favorites: [favoriteSchema],
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
