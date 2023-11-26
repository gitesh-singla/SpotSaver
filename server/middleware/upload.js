const multer = require("multer");
const path = require("path")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', 'uploads', 'spot-images'))
    },
    filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const filename = `File-${uniqueSuffix}${path.extname(file.originalname)}`;
      cb(null, filename)
    }
  })
  
  const upload = multer({ storage: storage });

  module.exports = upload;