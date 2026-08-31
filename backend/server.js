import "dotenv/config";
import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import { randomUUID } from "crypto";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: (process.env.CORS_ORIGINS || "*").split(","),
    credentials: true,
  })
);

const client = new MongoClient(process.env.MONGO_URL);
const db = client.db(process.env.DB_NAME);
const inquiries = db.collection("contact_inquiries");

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.get("/api/", (req, res) => {
  res.json({ message: "MBtex Group API" });
});

app.post("/api/contact", async (req, res) => {
  const { name, email, company = null, interest = null, message } = req.body || {};
  if (!name || !message || !email || !emailRe.test(email)) {
    return res.status(422).json({ detail: "name, valid email and message are required" });
  }
  const inquiry = {
    id: randomUUID(),
    name,
    email,
    company,
    interest,
    message,
    created_at: new Date().toISOString(),
  };
  await inquiries.insertOne({ ...inquiry });
  res.json(inquiry);
});

app.get("/api/contact", async (req, res) => {
  const docs = await inquiries
    .find({}, { projection: { _id: 0 } })
    .sort({ created_at: -1 })
    .limit(1000)
    .toArray();
  res.json(docs);
});

const port = Number(process.env.NODE_PORT || 8002);
app.listen(port, "0.0.0.0", () => {
  console.log(`Node backend listening on ${port}`);
});
