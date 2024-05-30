const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();

const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Optionally, set up a specific route for the index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/", (req, res) => {
  res.send("Recieved");
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const hashtag = new mongoose.Schema({
  name: String,
  count: Number,
})

const Hashtag = mongoose.model('Hashtag', hashtag);
