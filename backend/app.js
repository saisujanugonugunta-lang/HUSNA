const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const frontendDist = path.join(__dirname, "..", "frontend", "dist");

// CORS is retained for optional separately-hosted frontends.
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") return res.sendStatus(204);
    next();
});
app.use(express.json({ limit: "100kb" }));

app.get("/api/health", (req, res) => res.json({ success: true, service: "HS LAST backend" }));
app.get("/db-status", (req, res) => res.json({ connected: mongoose.connection.readyState === 1, status: mongoose.connection.readyState }));

app.post("/api/analyze", (req, res) => {
    const { text } = req.body || {};
    if (typeof text !== "string" || !text.trim()) {
        return res.status(400).json({ error: "Please provide job offer text." });
    }
    const offer = text.toLowerCase();
    let score = 0;
    const reasons = [];
    const checks = [
        { words: ["registration fee", "pay a fee", "upfront payment", "security deposit", "processing fee"], points: 3, reason: "The offer requests an upfront payment." },
        { words: ["guaranteed job", "100% guaranteed", "no interview", "instant selection"], points: 2, reason: "The offer makes unusually strong job guarantees." },
        { words: ["limited time", "act now", "urgent", "immediately", "today only"], points: 1, reason: "The message uses urgency to pressure you." },
        { words: ["otp", "password", "bank details", "upi pin", "share your pin"], points: 3, reason: "The message requests sensitive account information." },
        { words: ["earn thousands daily", "easy money", "no experience needed, high salary"], points: 2, reason: "The earnings or job claims may be unrealistic." }
    ];
    for (const check of checks) {
        if (check.words.some(word => offer.includes(word))) { score += check.points; reasons.push(check.reason); }
    }
    const risk = score >= 4 ? "High" : score >= 2 ? "Medium" : "Low";
    if (reasons.length === 0) reasons.push("No listed warning signs were detected. This does not prove the offer is genuine.");
    return res.json({ success: true, risk, score, reasons, recommendation: risk === "High" ? "Do not pay or share sensitive information until you independently verify the employer." : risk === "Medium" ? "Verify the employer and offer through official contact details before proceeding." : "Continue checking the employer and offer using independent, trusted sources." });
});

// Serve the built frontend from the same service, so one Render service can host both.
app.use(express.static(frontendDist));
app.get(/.*/, (req, res, next) => {
    if (req.path.startsWith("/api/") || req.path === "/db-status") return next();
    res.sendFile(path.join(frontendDist, "index.html"), err => { if (err) next(err); });
});

async function startServer() {
    try {
        if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is missing. Add it as a private environment variable in the hosting dashboard.");
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected successfully!");
        app.listen(PORT, () => console.log(`HS LAST frontend + backend running on port ${PORT}`));
    } catch (error) {
        console.error("Startup failed:", error.message);
        process.exit(1);
    }
}
startServer();
