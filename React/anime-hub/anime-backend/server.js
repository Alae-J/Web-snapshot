// server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const http = require("http");
const { Server } = require("socket.io");
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const logger = require("./logger");
require("dotenv").config();

// Initialize Sentry
Sentry.init({
    dsn: process.env.SENTRY_DSN || "",
    integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app: express() }),
    ],
    tracesSampleRate: 1.0,
});

const authRoutes = require("./routes/auth");
const animeRoutes = require("./routes/anime");
const userRoutes = require("./routes/user");
const notifyRoutes = require("./routes/notify");

const app = express();
const PORT = process.env.PORT || 5000;

// Sentry request & tracing handlers
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(
    morgan("combined", {
        stream: { write: (message) => logger.info(message.trim()) },
    })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/anime", animeRoutes);
app.use("/api/user", userRoutes);
app.use("/api/notify", notifyRoutes);

// Sentry error handler (must be before any other error middleware)
app.use(Sentry.Handlers.errorHandler());

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

// Connect to MongoDB
mongoose
.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => logger.info("MongoDB connected"))
.catch((err) => logger.error("MongoDB connection error:", err));

// Create HTTP server and attach Socket.io
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Make Socket.io instance available to routes via app settings
app.set("io", io);

// Socket.io connection events
io.on("connection", (socket) => {
    logger.info(`New client connected: ${socket.id}`);
    socket.on("disconnect", () => {
        logger.info(`Client disconnected: ${socket.id}`);
    });
});

// Start the server
server.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
});
