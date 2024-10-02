import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import styled from 'styled-components';
import '@fontsource/montserrat'; // Import Montserrat font
import MusicImage from '../pages/MMImage.jpeg'; // Adjust the path accordingly

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #000 0%, #333 100%);
  color: #fff;
  font-family: 'Montserrat', sans-serif;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #ff6600;
  margin-bottom: 20px;
`;

const SongGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  width: 80%;
  margin: auto;
`;

const SongTile = styled.div`
  background-color: #222;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #333;
  }

  img {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    object-fit: cover;
    margin-bottom: 10px;
  }

  h4 {
    color: #ff6600;
    margin-bottom: 5px;
    text-align: center;
    font-size: 1.2rem;
  }

  p {
    color: #fff;
    font-size: 1rem;
    margin: 0;
    margin-top: 10px;
  }

  button {
    background-color: #ff6600;
    color: #fff;
    border: none;
    padding: 10px;
    cursor: pointer;
    font-size: 1rem;
    border-radius: 5px;
    margin-top: 10px;
    transition: background-color 0.3s ease;

    &:disabled {
      background-color: #666;
      cursor: not-allowed;
    }
  }
`;

const Marketplace = () => {
  const [songs, setSongs] = useState([]);
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/songs/marketplace', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Ensure token is included correctly
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Fetched songs:', data); // Log the fetched data
        setSongs(data); // Set the fetched data to state
      } catch (error) {
        console.error('Error fetching songs:', error); // Log the error
      }
    };

    fetchSongs();
  }, [token]);

  const handlePurchase = async (songId) => {
    if (!token) {
      alert('You need to log in to purchase songs.');
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/purchases/purchase/${songId}`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      alert('Song purchased successfully');
      setSongs(prevSongs => prevSongs.map(song =>
        song._id === songId ? { ...song, purchased: true } : song
      ));
    } catch (error) {
      console.error('Error purchasing song:', error);
      alert(error.response?.data?.error || 'Purchase failed');
    }
  };

  return (
    <Container>
      {role === 'listener' && <Navbar />}
      <Title>Marketplace</Title>
      {songs.length === 0 ? (
        <p>No songs available for purchase.</p>
      ) : (
        <SongGrid>
          {songs.map(song => (
            <SongTile key={song._id}>
              <img src={MusicImage} alt="Song placeholder" />
              <h4>{song.title}</h4>
              <p>{song.artistName}</p> {/* Use artistName */}
              <p>£ {song.price}</p>
              <button
                onClick={() => handlePurchase(song._id)}
                disabled={song.purchased}
              >
                {song.purchased ? 'Purchased' : 'Buy'}
              </button>
            </SongTile>
          ))}
        </SongGrid>
      )}
    </Container>
  );
};

export default Marketplace;
