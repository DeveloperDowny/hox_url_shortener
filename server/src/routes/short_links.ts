import express from "express";
import { ShortLink } from "../../types/types";
import knex, { addLink, getLinks } from "../database/database";
import { randomUUID } from "crypto";
import qrcode from "qr-base64";

const shortLinkRouter = express.Router();

const baseLink = "http://localhost:5000/s/";

shortLinkRouter.post("/", async (req, res) => {
  let shortLink: ShortLink = req.body;
  const short_link = randomUUID();
  shortLink.short_link = short_link;
  const qrStr = baseLink + shortLink + "?ref=qr";
  const qr = qrcode(qrStr);
  shortLink.qr = qr;

  const id = await addLink(shortLink);
  shortLink.id = id;

  res.json(shortLink);
});

shortLinkRouter.get("/", async (req, res) => {
  const data = await getLinks();
  console.log(data);

  res.json(data);
});

export default shortLinkRouter;
