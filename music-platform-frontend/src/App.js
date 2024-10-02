import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import UploadSong from './components/UploadSong';
import ViewSongs from './components/ViewSongs';
import Marketplace from './components/Marketplace';
import ArtistSongs from './components/ArtistSongs';

function App() {
  const [token, setToken] = useState(null); // Token state
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setToken={setToken} />} /> {/* Pass setToken */}
        <Route path="/my-songs" element={<ArtistSongs />} /> {/* New route */}
        <Route path="/upload-songs" element={<UploadSong />} /> {/* Ensure this exists */}
        <Route path="/marketplace" element={<Marketplace token={token} />} /> {/* Pass token */}
        <Route path="/view-songs" element={<ViewSongs token={token} />} /> {/* Pass token */}
      </Routes>
    </Router>
  );
}

export default App;