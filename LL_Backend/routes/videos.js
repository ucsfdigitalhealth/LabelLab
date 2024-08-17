const multer = require('multer')
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');
const AWS = require('aws-sdk')
const router = require('express').Router()

const videoFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(mp4|avi|mkv)$/)) {
        return cb(new Error('Only video files are allowed.'));
    }
    cb(null, true);
}

/* 
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./tempVideos/");
    },

    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
}); */

const upload = multer({
    fileFilter: videoFilter, 
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024
    }
})

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: 'us-west-1',
});

const s3 = new AWS.S3();

router.post('/newVideo', upload.single('file'), (req, res) => {
    const inputBuffer = req.file.buffer;
    const inputName = req.file.originalname.split('.')[0]
    //save buffer to file

    /* const tempFileExtension = path.extname(req.file.originalname);
    const tempFileName = `${inputName}-temp${tempFileExtension}`;

    console.log("Saving file to ./tempVideos/" + tempFileName);
    fs.writeFileSync("./tempVideos/" + tempFileName, inputBuffer);
    console.log("File saved to disk.");

    ffmpeg("./tempVideos/" + tempFileName)
    .output("./tempVideos/" + inputName)
    .videoCodec("libx264")
    .audioCodec('aac')
    .videoBitrate(`1k`)
    .autopad()
    .on("end", async function () {
        console.log("Video compression complete!")
        const params = {
            Bucket: 'labellab-videos',
            Key: inputName,
            Body: Buffer.from("./tempVideos/" + req.file.originalname)
        };

        s3.upload(params, (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error uploading file');
            }
            res.send('File uploaded successfully');
        })
    }); */

    const params = {
        Bucket: 'labellab-videos',
        Key: `${inputName}${path.extname(req.file.originalname)}`,
        Body: inputBuffer,
    };

    s3.upload(params, (err, data) => {
        console.log("uploading")
        if (err) {
            console.error(err);
            return res.status(500).send('Error uploading file');
        }
        res.send('File uploaded successfully');
    }) 
})

module.exports = router