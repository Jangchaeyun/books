import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path-browserify";

AWS.config.update({
  region: "ap-northeast-2",
  accessKeyId: "AKIAZQS2RJDGV643GD5A",
  secretAccessKey: "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",
});

const s3 = new AWS.S3();

const allowedExtenstions = [".png", ".jpg", ".jpeg", ".bmp"];

const imageUploader = multer({
  storage: multerS3({
    s3: s3,
    bucket: "bookstest",
    key: (req, file, callback) => {
      const uplpadDirectory = req.query.directory ?? "/outputs";
      const extension = path.extname(file.originalname);
      if (!allowedExtenstions.includes(extension)) {
        return callback(new Error("wrong extension"));
      }
      callback(null, `${uplpadDirectory}/${Date.now()}_${file.originalname}`);
    },
    acl: "public-read-write",
  }),
});

export default imageUploader;
