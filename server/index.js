import app from "./app.js";

app.server.listen(process.env.PORT || 5000, () => {
  console.log(`Started on port ${app.server.address().port}`);
});
