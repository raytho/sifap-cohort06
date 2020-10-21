const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = new aws.S3();
const path = require("path");

const { s3AccessKey, s3AccessSecret } = require("../../config");

aws.config.update({
  secretAccessKey: s3AccessSecret,
  accessKeyId: s3AccessKey,
  region: "us-east-2",
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
  }
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    acl: "public-read",
    s3,
    bucket: "sifap-profile-pictures",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: "TESTING_METADATA" });
    },
    key: function (req, file, cb) {
      console.log(file.mimetype);
      cb(null, Date.now().toString()+ path.extname(file.originalname));
    },
  }),
});

module.exports = upload;
