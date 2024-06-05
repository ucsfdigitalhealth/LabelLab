// the updated server.js file is separately deployed temporarily for testing purposes. The code is at https://github.com/origamitician/LabelLabAPI2. 

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const app = express();
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true}).then(() => {
  console.log("connected to database")
})

app.use(express.static(path.join(__dirname, "public")));

// Optionally, set up a specific route for the index.html
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
app.post('/new', jsonParser, (req, res) => {
  console.log("post requested")
  let bodyData = req.body;
  let songID = bodyData.videoID.toString()
  console.log("songID to look for is " + songID)
  Hashtags.findOne({videoID: songID}).then((data) => {
    console.log("> Data is: " + JSON.stringify(data))
    if (data) {
      // if there is an object with an video ID inserted.
      console.log("Video ID exists")

      // merge the incoming data.
      let tempMergedData = {...data};
      
    } else {
      console.log("Video ID does not exist")
      let hashtagInfo = [];
      Object.keys(bodyData.htData).forEach(obj => {
        const hashtagValue = bodyData.htData[obj]
        hashtagInfo.push({hashtagName: obj, hashtagAvg: hashtagValue, hashtagSubmissions: 1, hashtagRatingArray: [hashtagValue]})
      })
      let h = new Hashtags({
        videoCategory: 'test',
        videoID: songID,
        numSubmissions: 1,
        isRelatedCount: Math.floor(Math.random()*34),
        hashtags: Object.keys(bodyData.htData),
        hashtagInfo: hashtagInfo,
      })
    
      h.save().then((err, docs) => {
        if (err) console.log(err);
        res.send(`Successfully added`)
      })
    }
  })
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server is running on port: " + port);
})