const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");
function defaultFunction() {
  const s3 = new aws.S3({
    accessKeyId: "AKIA4EMCEGTOZPTLD3EQ", //AKIA4EMCEGTOYD2CS5JQ
    secretAccessKey: "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", //yKRMf4MGv7yIzXLkj/wksG5SDmqUwjd6D+0HtfwG
    Bucket: "e-medix",
  });

  var upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: "e-medix",
      acl: "public-read",
      key: function (req, file, cb) {
        cb(
          null,
          path.basename(file.originalname, path.extname(file.originalname)) +
            "-" +
            Date.now() +
            path.extname(file.originalname)
        );
      },
    }),
    limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    },
  }).single("file");
  function checkFileType(file, cb) {
    // Allowed ext
    const filetypes =
      /jpeg|jpg|png|gif|JPG|JPEG|PNG|Png|Jpeg|Jpg|TIFF|tiff|EPS|eps|HEIC|heic|/;
    // Check ext
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images Only!");
    }
  }
  return upload;
}
const uploadFile = (module.exports = defaultFunction);
