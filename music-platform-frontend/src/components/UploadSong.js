import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import styled from 'styled-components';
import '@fontsource/montserrat';

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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #555;
  border-radius: 5px;
  background-color: #222;
  color: #fff;
  font-size: 1rem;
  width: 300px;
  max-width: 100%;
`;

const FileInput = styled(Input)`
  padding: 5px;
  width: auto;
`;

const Button = styled.button`
  background-color: #ff6600;
  color: #000;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1.2rem;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
  margin-top: 10px;

  &:hover {
    background-color: #000;
    color: #ff6600;
  }
`;

const UploadSongs = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [song, setSong] = useState(null);
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('song', song);

    try {
      await axios.post('http://localhost:5000/api/songs/upload', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Song uploaded successfully');
      setTitle('');
      setPrice('');
      setSong(null);
    } catch (error) {
      console.error('Error uploading song:', error);
      alert('Failed to upload song');
    }
  };

  return (
    <Container>
      <Navbar />
      <Title>Upload Your Song</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Song Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="Price (£)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <FileInput
          type="file"
          onChange={(e) => setSong(e.target.files[0])}
          required
        />
        <Button type="submit">Upload</Button>
      </Form>
    </Container>
  );
};

export default UploadSongs;
