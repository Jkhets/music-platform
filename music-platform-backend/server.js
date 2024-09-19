const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/static', express.static(path.join(__dirname, 'sampleSongs')));

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import routes
const userRoutes = require('./routes/userRoutes');
const songRoutes = require('./routes/songRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));