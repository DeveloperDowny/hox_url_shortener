import express from "express";
import { ShortLink } from "../../types/types";
import knex, {
  addLink,
  getAllAnalytics,
  getAnalyticsById,
  getLinks,
  updateLink,
} from "../database/database";
import { randomUUID } from "crypto";
import qrcode from "qr-base64";

const shortLinkRouter = express.Router();

const baseLink = "http://localhost:5000/";

function generateQRCode(short_link) {
  const qrStr = baseLink + short_link + "?ref=qr";
  const qr = qrcode(qrStr);
  return qr;
}

shortLinkRouter.post("/", async (req, res) => {
  console.log(req.body.long_link);

  let shortLink: ShortLink = {
    long_link: req.body.long_link,
  };
  const short_link = randomUUID();
  shortLink.short_link = short_link;
  const qr = generateQRCode(short_link);
  shortLink.qr = qr;

  const id = await addLink(shortLink);
  shortLink.id = id;

  res.sendStatus(200);
});

shortLinkRouter.get("/", async (req, res) => {
  const data = await getAllAnalytics();

  res.json(data);
});

shortLinkRouter.get("/:sid/analytics", async (req, res) => {
  const data = await getAnalyticsById(req.params.sid);
  res.json(data);
});

shortLinkRouter.patch("/:sid", async (req, res) => {
  try {
    const qr = generateQRCode(req.body.short_link);
    const updates = {
      long_link: req.body.long_link,
      short_link: req.body.short_link,
      qr: qr,
    };
    const data = await updateLink(req.params.sid, updates);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(409).json({ error: error.message || "An error occurred" });
  }
});

export default shortLinkRouter;
