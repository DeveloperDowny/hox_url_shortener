import express from "express";

const shortLinkRouter = express.Router();

shortLinkRouter.post("/", (req, res) => {
  console.log(req.body);
  console.log("here");
  res.json({
    id: "new_id",
  });
});

shortLinkRouter.get("/", (req, res) => {
  res.json({
    test: "success",
  });
});

export default shortLinkRouter;
