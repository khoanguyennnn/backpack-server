const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/Images/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    } 
})

var Upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback) {
        if(
            file.mimetype == "image/png" || 
            file.mimetype == "image/jpg" || 
            file.mimetype == "image/jpeg" 
        ) {
            callback(null, true)
        } else {
            console.log("Only jpg or png are accepted!");
            callback(null, false)
        }
    }
})

module.exports = Upload;
