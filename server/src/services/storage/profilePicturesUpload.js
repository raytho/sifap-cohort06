/* eslint-disable no-unused-vars */
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = new aws.S3();
const path = require("path");

const { s3AccessKey, s3AccessSecret } = require("../../config");

const LIMIT_SIZE = 5 * 1024 * 1024;

aws.config.update({
  secretAccessKey: s3AccessSecret,
  accessKeyId: s3AccessKey,
  region: "us-east-2",
});

const fileFilter = (req, file, cb) => {
  console.log(file);
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
  }
};

const upload = multer({
  fileFilter,
  limits: { fileSize: LIMIT_SIZE },
  storage: multerS3({
    acl: "public-read",
    s3,
    bucket: "sifap-profile-pictures",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: "sifap user profile" });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + path.extname(file.originalname));
    },
  }),
});

const uploadStadistics = (csv, name) => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: "sifapds", // pass your bucket name
      Key: `${name}-${new Date().getTime()}.csv`, // file will be saved as testBucket/contacts.csv
      ACL: "public-read",
      Body: csv,
      ContentType: "text/csv",
    };
    s3.upload(params, function (s3Err, data) {
      if (s3Err) {
        reject(new Error("Error al subir el archivo"));
      } else {
        resolve(data.Location);
      }
    });
  });
};

const uploadPdf = (file) => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: "sifap-invoices", 
      Key: `${new Date().getTime()}.pdf`, // file will be saved as testBucket/contacts.csv
      ACL: "public-read",
      Body: file,
      ContentType: "application/pdf",
    };
    s3.upload(params, function (error, data) {
      if (error) {
        reject(new Error("S3 Error", error.message));
      } else {
        resolve(data.Location);
      }
    });
  });
};

const deleteLastCsv = function (filename, callback) {
  var s3 = new aws.S3();
  var params = {
    Bucket: "sifapds",
    Key: filename,
  };
  s3.deleteObject(params, function (err) {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null);
    }
  });
};

const deleteLastImg = function (filename, callback) {
  var s3 = new aws.S3();
  var params = {
    Bucket: "sifap-profile-pictures",
    Key: filename,
  };
  s3.deleteObject(params, function (err) {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null);
    }
  });
};

module.exports = { upload, uploadStadistics, deleteLastImg, uploadPdf };
