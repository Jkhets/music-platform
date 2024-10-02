import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const registerUser = (userData) => axios.post(`${API_URL}/users/register`, userData);

export const loginUser = (userData) => axios.post(`${API_URL}/users/login`, userData);

export const uploadSong = (formData, token) => axios.post(`${API_URL}/songs/upload`, formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${token}`
}})

export const fetchSongs = () => axios.get(`${API_URL}/songs/all`);

export const purchaseSong = (songId, token) => axios.post(`${API_URL}/songs/purchase/${songId}`, {}, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});