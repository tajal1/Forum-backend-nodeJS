const multer = require("multer");
const path = require("path");
const fs = require('fs')

// storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

module.exports = storage;

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 100000000
    }
})

module.exports = upload;