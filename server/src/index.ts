// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import shortLinkRouter from "./routes/short_links";

import cors from "cors";

import * as OpenApiValidator from "express-openapi-validator";
import { getLinkById } from "./database/database";
import { link } from "fs";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

// app.use(
//   OpenApiValidator.middleware({
//     apiSpec: "./public/openapi.json",
//     validateRequests: false,
//     validateResponses: false,
//   })
// );

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api/short_links", shortLinkRouter);

app.get("/:short_link", async (req, res) => {
  let ref = req.query.ref ?? "link";
  if (ref != "link" && ref != "qr") {
    ref = "link";
  }
  console.log(ref);

  const shortLink = await getLinkById(req.params.short_link);
  if (!shortLink) {
    return res.send("No Link Found");
  }
  res.redirect(shortLink.long_link);
});

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
