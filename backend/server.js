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

// --- Email notification (Emergent managed email proxy) ---
const EMAIL_BASE_URL = "https://integrations.emergentagent.com"; // constant, not env
const EMAIL_KEY = process.env.EMERGENT_EMAIL_KEY;
const EMAIL_FROM_NAME = process.env.EMAIL_FROM_NAME;
const OWNER_EMAIL = process.env.OWNER_EMAIL;

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const CRED_ASK = [
  "reply with your password", "reply with the code", "send your password", "cvv",
  "send us your password", "enter your password below", "confirm your card number",
  "your full card number", "seed phrase", "recovery phrase", "verify your card",
  "social security number", "confirm your bank details",
];
const SHORTENERS = ["bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly"];

function assertSafeEmail(subject, html) {
  if (/<\s*(form|input|textarea|select)\b/i.test(html)) throw new Error("No forms or input fields in email (G2)");
  const body = `${subject}\n${html}`.toLowerCase();
  for (const p of CRED_ASK) if (body.includes(p)) throw new Error(`Email asks for credentials: ${p} (G2)`);
  const urls = [...html.matchAll(/\b(?:href|src)\s*=\s*["']([^"']+)["']/gi)].map((m) => m[1]);
  for (const url of urls) {
    const low = url.trim().toLowerCase();
    if (/^(mailto:|tel:|cid:|#)/.test(low)) continue;
    if (!low.startsWith("https://")) throw new Error(`Email links must be absolute https: ${url} (G3)`);
    const u = new URL(low);
    const host = u.hostname || "";
    if (!host || host.includes("xn--") || u.username || /^[\d.]+$/.test(host) || host.includes(":"))
      throw new Error(`Unsafe URL host: ${url} (G3)`);
    if (SHORTENERS.some((s) => host === s || host.endsWith("." + s)))
      throw new Error(`URL shorteners not allowed: ${url} (G3)`);
  }
}

async function sendEmail({ to, subject, html }) {
  assertSafeEmail(subject, html);
  const resp = await fetch(`${EMAIL_BASE_URL}/api/v1/email/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Email-Key": EMAIL_KEY },
    body: JSON.stringify({ to: [to], subject, html, from_name: EMAIL_FROM_NAME }),
  });
  if (!resp.ok) throw new Error(`send failed: ${resp.status} ${await resp.text()}`);
  return (await resp.json()).id;
}

function notifyOwner(inquiry) {
  if (!EMAIL_KEY || !EMAIL_FROM_NAME || !OWNER_EMAIL) {
    console.error("[MBtex] Email notification skipped: set EMERGENT_EMAIL_KEY, EMAIL_FROM_NAME and OWNER_EMAIL in backend/.env");
    return;
  }
  const row = (label, value) =>
    value
      ? `<tr><td style="padding:6px 12px;color:#888;font-size:13px;white-space:nowrap">${label}</td>` +
        `<td style="padding:6px 12px;color:#222;font-size:14px">${escapeHtml(value)}</td></tr>`
      : "";
  const subject = `New partnership inquiry from ${inquiry.name}`;
  const html =
    `<table role="presentation" width="100%" style="font-family:Arial,sans-serif;max-width:600px">` +
    `<tr><td style="padding:16px 12px;font-size:16px;color:#071A33"><strong>New inquiry received on mbtexgroup.com</strong></td></tr>` +
    row("Name", inquiry.name) +
    row("Email", inquiry.email) +
    row("Company", inquiry.company) +
    row("Interest", inquiry.interest) +
    row("Message", inquiry.message) +
    row("Received", inquiry.created_at) +
    `<tr><td colspan="2" style="padding:16px 12px;font-size:12px;color:#888">Sent by ${escapeHtml(EMAIL_FROM_NAME)} website. We never ask for passwords or payment details by email.</td></tr>` +
    `</table>`;
  sendEmail({ to: OWNER_EMAIL, subject, html })
    .then((id) => console.log(`[MBtex] Inquiry notification emailed to ${OWNER_EMAIL} (id: ${id})`))
    .catch((err) => console.error("[MBtex] Email notify failed:", err?.message || err));
}

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
  notifyOwner(inquiry);
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
