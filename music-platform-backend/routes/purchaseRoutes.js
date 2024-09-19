const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');
const User = require('../models/User');
const Song = require('../models/Song');
const { authenticateToken, authorizeArtist } = require('../middleware/authMiddleware');

// Purchase a song
router.post('/purchase/:songId', authenticateToken, async (req, res) => {
  const { songId } = req.params;
  const userId = req.user.userId;

  console.log('Song ID:', songId); // Debugging
  console.log('User ID:', userId); // Debugging

  try {
    // Find the song by ID
    const song = await Song.findById(songId);
    if (!song) return res.status(404).json({ error: 'Song not found' });

    // Check if user already purchased the song
    const existingPurchase = await Purchase.findOne({ song: songId, user: userId });
    if (existingPurchase) return res.status(400).json({ error: 'Song already purchased' });

    // Create a new purchase record
    const purchase = new Purchase({ song: songId, user: userId });
    await purchase.save();

    res.status(201).json({ message: 'Purchase successful' });
  } catch (err) {
    console.error('Purchase error:', err.message); // Debugging
    res.status(400).json({ error: err.message });
  }
});

router.get('/my-songs', authenticateToken, async (req, res) => {
  const userId = req.user.userId;

  try {
    // Find all purchases for the logged-in user
    const purchases = await Purchase.find({ user: userId })
      .populate({
        path: 'song',
        populate: {
          path: 'artist', // Populate the artist field inside the song
          select: 'username' // Select only the username field from the artist
        }
      });
    
    // Map purchases to return song data with artist's name
    const purchasedSongs = purchases.map(purchase => ({
      title: purchase.song.title,
      fileUrl: purchase.song.fileUrl,
      artistName: purchase.song.artist.username // Access the populated artist's username
    }));

    res.status(200).json(purchasedSongs);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving purchased songs' });
  }
});

module.exports = router;