const multer = require('multer');
const path = require('path');

// Configure storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination folder for uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10000000 }, // 10MB limit for song files
  fileFilter: function (req, file, cb) {
    const filetypes = /mp3|wav/; // Accept only mp3 and wav files
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    console.log('File Mime Type:', file.mimetype); // Log MIME type
    console.log('File Ext Name:', path.extname(file.originalname).toLowerCase()); // Log file extension
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only .mp3 and .wav files are allowed!'));
    }
  }
});

module.exports = upload;