const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      "IMG" +
        "-" +
        Date.now() +
        Math.round(Math.random() * 1000000) +
        "." +
        file.mimetype.split("/")[1]
    );
  },
});

const fileFilter = (req, file, cb) => {
  const fileSize = parseInt(req.headers["content-length"]);
  if (fileSize >= 1024 * 1024) {
    return cb(new Error("File size too large"));
  }

  if (
    file.mimetype.split("/")[1] !== "jpg" &&
    file.mimetype.split("/")[1] !== "jpeg"
  ) {
    return cb(new Error("File Format not match"));
  }

  cb(null, true);
};

exports.multerUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
});
