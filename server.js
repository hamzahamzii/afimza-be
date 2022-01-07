// LIB IMPORTS
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// MODELS
const Thought = require("./models/thought");

// GLOBAL VARS
const PORT = process.env.PORT || 8000;
const dbURI =
  process.env.MONGODB_URI ||
  "mongodb+srv://hamzahamzii:Blah-12345@afimza.loxun.mongodb.net/afimza?retryWrites=true&w=majority";

// APP INITIALIZATION
const app = express();

// CONFIGURING MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());

// CONNECTING TO DB
mongoose
  .connect(dbURI)
  .then(() => console.log("connection successfull"))
  .catch((err) => console.log(err));

// ROUTES
app.post("/thoughts", (req, res) => {
  console.log("got req", req.body);
  const thought = new Thought(req.body);
  thought.save();
  console.log("thought saved", thought);
  res.end(JSON.stringify(thought));
});
app.get("/thoughts", (req, res) => {
  console.log("get thoughts", req.body);
  Thought.find()
    .then((data) => {
      console.log(data);
      res.end(JSON.stringify(data));
    })
    .catch((err) => console.log(err));
});
app.delete("/thoughts/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  Thought.findByIdAndDelete(req.params.id).then((res) => console.log(res));
  res.end("del done");
});

// STARTING SERVER
app.listen(PORT);
