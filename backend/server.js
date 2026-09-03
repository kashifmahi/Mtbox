import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import { randomUUID } from "crypto";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: (process.env.CORS_ORIGINS || "*").split(","),
    credentials: true,
  })
);

const mongoUrl = process.env.MONGO_URL;
let inquiries = null;
if (mongoUrl && process.env.DB_NAME) {
  const client = new MongoClient(mongoUrl);
  const db = client.db(process.env.DB_NAME);
  inquiries = db.collection("contact_inquiries");
} else {
  console.error(
    "[MBtex] MONGO_URL and/or DB_NAME is not set — the contact form is disabled.\n" +
      "Create backend/.env with:\n" +
      "  MONGO_URL=<your MongoDB connection string (e.g. MongoDB Atlas)>\n" +
      "  DB_NAME=mbtex_db\n" +
      "The website will still be served."
  );
}

process.on("unhandledRejection", (err) => {
  console.error("[MBtex] Unhandled rejection (kept alive):", err?.message || err);
});
process.on("uncaughtException", (err) => {
  console.error("[MBtex] Uncaught exception (kept alive):", err?.message || err);
});

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const dbRequired = (req, res, next) => {
  if (!inquiries) {
    return res.status(503).json({ detail: "Database not configured. Set MONGO_URL and DB_NAME in backend/.env" });
  }
  next();
};

app.get("/api/", (req, res) => {
  res.json({ message: "MBtex Group API" });
});

app.post("/api/contact", dbRequired, async (req, res) => {
  const { name, email, company = null, interest = null, message } = req.body || {};
  if (!name || !message || !email || !emailRe.test(email)) {
    return res.status(422).json({ detail: "name, valid email and message are required" });
  }
  const inquiry = {
    id: randomUUID(),
    name: String(name).slice(0, 200),
    email: String(email).slice(0, 200),
    company: company ? String(company).slice(0, 200) : null,
    interest: interest ? String(interest).slice(0, 200) : null,
    message: String(message).slice(0, 5000),
    created_at: new Date().toISOString(),
  };
  try {
    await inquiries.insertOne({ ...inquiry });
  } catch (err) {
    console.error("[MBtex] Mongo insert failed:", err?.message || err);
    return res.status(503).json({ detail: "Database unavailable. Please try again later." });
  }
  res.json(inquiry);
});

app.get("/api/contact", dbRequired, async (req, res) => {
  try {
    const docs = await inquiries
      .find({}, { projection: { _id: 0 } })
      .sort({ created_at: -1 })
      .limit(1000)
      .toArray();
    res.json(docs);
  } catch (err) {
    console.error("[MBtex] Mongo read failed:", err?.message || err);
    res.status(503).json({ detail: "Database unavailable. Please try again later." });
  }
});

// Self-hosting: serve the built frontend (frontend/dist) if it exists
const dist = path.join(__dirname, "../frontend/dist");
if (fs.existsSync(dist)) {
  app.use(express.static(dist));
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(dist, "index.html"));
  });
}

const port = Number(process.env.NODE_PORT || process.env.PORT || 8002);
app.listen(port, "0.0.0.0", () => {
  console.log(`Node backend listening on ${port}`);
});
