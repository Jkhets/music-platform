const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // Adjust the path to your User model
const Song = require('./models/Song'); // Adjust the path to your Song model

// Connect to your MongoDB database
mongoose.connect('mongodb://localhost:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createSampleData = async () => {
  try {
    const hashedPassword = await bcrypt.hash('jaytest123', 10);
    
    const artist = new User({
      username: 'Jay',
      email: 'jaytest@gmail.com',
      password: hashedPassword,
      role: 'artist'
    });
    await artist.save();

    // Create sample songs
    const songs = [
        { title: 'Chamber of Reflection (S+R)', artist: artist._id, fileUrl: '/static/chamberOfReflection.mp3', price: 0 },
        { title: 'Skyfall (S+R)', artist: artist._id, fileUrl: '/static/skyFall.mp3', price: 0 },
        { title: 'Space Song (S+R)', artist: artist._id, fileUrl: '/static/spaceSong.mp3', price: 0 },
        { title: 'Real (S+R)', artist: artist._id, fileUrl: '/static/Real.mp3', price: 0 },
        { title: 'Tell Me (S+R)', artist: artist._id, fileUrl: '/static/tellMe.mp3', price: 0 },
      ];

    await Song.insertMany(songs);

    console.log('Sample data created successfully');
  } catch (error) {
    console.error('Error creating sample data:', error);
  } finally {
    mongoose.disconnect();
  }
};

createSampleData();