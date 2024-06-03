const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true}).then(() => {
    console.log('successfully connected to database')
})
console.log(process.env);

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const htagSubSchema = new mongoose.Schema({
  hashtagName: String,
  hashtagAvg: Number,
  hashtagSubmissions: Number,
  hashtagRatingArray: [Number],
})

const htag = new mongoose.Schema({
  videoCategory: String,
  videoID: String,
  numSubmissions: Number,
  isRelatedCount: Number,
  hashtags: [String],
  hashtagInfo: [htagSubSchema],
})

const Hashtags = mongoose.model('Hashtags', htag);
app.get('/newtest', (req, res) => {
  let h = new Hashtags({
    videoCategory: 'test',
    videoID: '1234567',
    numSubmissions: 5,
    isRelatedCount: 3,
    hashtags: ['#lorem', '#ipsum', '#what'],
    hashtagInfo: [
      {hashtagName: '#lorem', hashtagAvg: 4.5, hashtagSubmissions: 4, hashtagRatingArray: [4, 4, 5, 5]},
      {hashtagName: '#ipsum', hashtagAvg: 4, hashtagSubmissions: 3, hashtagRatingArray: [3, 4, 5]},
      {hashtagName: '#what', hashtagAvg: 8, hashtagSubmissions: 5, hashtagRatingArray: [6, 7, 8, 9, 10]},
    ]
  })

  h.save().then((err, docs) => {
    if (err) console.log(err);
    res.send(`Successfully added`)
  })
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})