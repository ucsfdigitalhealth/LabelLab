// the updated server.js file is separately deployed temporarily for testing purposes. The code is at https://github.com/origamitician/LabelLabAPI2. 

// ==================> Setup
const express = require("express");
const path = require("path");
const cors = require("cors")
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const app = express();

require('dotenv').config({ path: path.join(__dirname, 'secrets.env') });
app.use(cors())
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true}).then(() => {
  console.log("connected to database")
})

// ==================> Routes
const hashtagRouter = require('./routes/hashtags')
const videosRouter = require('./routes/videos')
// Optionally, set up a specific route for the index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use(videosRouter)
app.use(hashtagRouter)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server is running on port: " + port);
})