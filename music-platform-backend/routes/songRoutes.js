const express = require('express');
const router = express.Router();
const Song = require('../models/Song');
const { authenticateToken, authorizeArtist } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');
const Purchase = require('../models/Purchase');
const fs = require('fs');

// Ensure uploads directory exists
const uploadsDirectory = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDirectory)) {
  fs.mkdirSync(uploadsDirectory);
}

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10000000 }, // 10MB limit
  fileFilter: function (req, file, cb) {
    const filetypes = /mp3|wav/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const validMimeTypes = ['audio/mpeg', 'audio/wav'];
    const mimetype = validMimeTypes.includes(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only .mp3 and .wav files are allowed!'));
    }
  }
});

// Upload a new song (requires authentication and artist role)
router.post('/upload', authenticateToken, authorizeArtist, upload.single('song'), async (req, res) => {
  const { title, price } = req.body;
  const artistId = req.user.userId;

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const fileUrl = `/uploads/${req.file.filename}`;

  try {
    const song = new Song({ title, artist: artistId, fileUrl, price });
    await song.save();
    res.status(201).json({ message: 'Song uploaded successfully', song });
  } catch (err) {
    console.error('Error saving song:', err);
    res.status(500).json({ error: 'Failed to upload song' });
  }
});

// Get all songs
router.get('/all', async (req, res) => {
  try {
    const songs = await Song.find().populate('artist', 'username');
    res.json(songs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/artists-songs', authenticateToken, async (req, res) => {
  const artistId = req.user.userId;

  try {
    const songs = await Song.find({ artist: artistId });
    res.json(songs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get marketplace songs with purchase status
router.get('/marketplace', authenticateToken, async (req, res) => {
  const userId = req.user.userId;

  try {
    const songs = await Song.find().populate({
      path: 'artist',
      select: 'username'
    });

    // Map songs to include the artist's username and purchase status
    const formattedSongs = await Promise.all(songs.map(async (song) => {
      const purchased = await Purchase.exists({ user: userId, song: song._id });
      return {
        _id: song._id,
        title: song.title,
        fileUrl: song.fileUrl,
        price: song.price,
        artistName: song.artist.username,
        purchased: !!purchased
      };
    }));

    res.json(formattedSongs);
  } catch (err) {
    console.error('Error fetching songs for marketplace:', err.message);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
