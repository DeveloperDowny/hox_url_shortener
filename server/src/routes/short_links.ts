import express from "express";
import { ShortLink } from "../../types/types";
import knex, {
  addLink,
  getAnalyticsById,
  getLinks,
} from "../database/database";
import { randomUUID } from "crypto";
import qrcode from "qr-base64";

const shortLinkRouter = express.Router();

const baseLink = "http://localhost:5000/";

shortLinkRouter.post("/", async (req, res) => {
  console.log(req.body.long_link);

  let shortLink: ShortLink = {
    long_link: req.body.long_link,
  };
  const short_link = randomUUID();
  shortLink.short_link = short_link;
  const qrStr = baseLink + short_link + "?ref=qr";
  const qr = qrcode(qrStr);
  shortLink.qr = qr;

  const id = await addLink(shortLink);
  shortLink.id = id;

  res.json(shortLink);
});

shortLinkRouter.get("/", async (req, res) => {
  const data = await getLinks();

  res.json(data);
});

shortLinkRouter.get("/:sid/analytics", async (req, res) => {
  const data = await getAnalyticsById(req.params.sid);
  res.json(data);
});

export default shortLinkRouter;
