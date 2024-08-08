// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import shortLinkRouter from "./routes/short_links";

import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api/short_links", shortLinkRouter);

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
