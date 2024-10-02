import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import styled from 'styled-components';
import '@fontsource/montserrat'; // Import Montserrat font
import CustomAudioPlayer from './CustomAudioPlayer';
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
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Adjust tile size */
  gap: 20px; /* Increased gap for padding between tiles */
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
  width: 200px; /* Constrain the width of the SongTile */

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
    white-space: nowrap;  /* Prevents the text from wrapping */
    overflow: hidden;     /* Hides overflowed text */
    text-overflow: ellipsis; /* Adds ellipsis when text overflows */
    width: 100%; /* Ensure that it takes the full width of the parent */
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



const ViewSongs = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  useEffect(() => {
    const fetchPurchasedSongs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/purchases/my-songs', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSongs(response.data);
        console.log('Purchased songs:', response.data);
      } catch (error) {
        console.error('Error fetching purchased songs:', error);
      }
    };

    fetchPurchasedSongs();
  }, [token]);

  const handleSongClick = (song) => {
    setCurrentSong(song);
  };

  return (
    <Container>
      {role === 'listener' && <Navbar />}
      <Title>My Songs</Title>
      {songs.length === 0 ? (
        <p>No purchased songs yet.</p>
      ) : (
        <SongGrid>
          {songs.map((song, index) => (
            <SongTile key={index} onClick={() => handleSongClick(song)}>
              <img src={MusicImage} alt="Song placeholder" />
              <h4>{song.title}</h4>
              <p>{song.artistName}</p> 
            </SongTile>
          ))}
        </SongGrid>
      )}
      {currentSong && (
        <CustomAudioPlayer src={`http://localhost:5000${currentSong.fileUrl}`} title={currentSong.title} />
      )}
    </Container>
  );
};

export default ViewSongs;
