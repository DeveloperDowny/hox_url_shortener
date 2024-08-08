// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import shortLinkRouter from "./routes/short_links";

import cors from "cors";

import * as OpenApiValidator from "express-openapi-validator";
import { getLinkById } from "./database/database";
import bodyParser from "body-parser";
import multer from "multer";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(multer);
/* The line `// app.use(multer);` is currently commented out in the code. If uncommented, it would be
attempting to use the `multer` middleware in the Express application. */

app.use(
  OpenApiValidator.middleware({
    apiSpec: "./public/openapi.json",
    validateRequests: true,
    validateResponses: true,
  })
);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});
app.use(express.static("public"));
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api/short_links", shortLinkRouter);

app.get("/:short_link", async (req, res) => {
  let ref = req.query.ref ?? "link";
  if (ref != "link" && ref != "qr") {
    ref = "link";
  }
  console.log("\n\n\n");

  console.log("Source: ", ref);
  console.log("Short Link: ", "http://localhost:5000/" + req.params.short_link);

  const shortLink = await getLinkById(req.params.short_link);

  if (!shortLink) {
    return res.send("No Link Found");
  }
  console.log("Destination URL: ", shortLink.long_link);

  res.redirect(shortLink.long_link);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
