require("dotenv").config({ path: "variables.env" });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const processMessage = require("./src/Component/Chatbot/process-message");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("port", process.env.PORT || 6969);

app.post("/chatbot", (req, res) => {
  const { message } = req.body;
  processMessage(message);
  res.send("Finish!!");
});

const server = app.listen(app.get("port"), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
