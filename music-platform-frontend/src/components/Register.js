import React, { useState } from 'react';
import { registerUser } from './api';
import styled, { keyframes } from 'styled-components';
import '@fontsource/montserrat';

// Define keyframe animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content horizontally */
  padding: 50px;
  min-height: 100vh;
  background: linear-gradient(135deg, #000 0%, #333 100%); /* Diagonal gradient from black to dark grey */
  color: #fff;
  font-family: 'Montserrat', sans-serif; /* Montserrat font */
`;

const Header = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 50px;
`;

const Title = styled.h1`
  font-size: 4rem;
  color: #ff6600; /* Sleek orange */
  font-weight: 600; /* Adjust weight as needed */
  margin-bottom: 10px;
`;

const RegisterHeader = styled.h2`
  font-size: 2rem;
  color: #fff;
  margin-bottom: 30px;
  animation: ${fadeIn} 1s ease-in; /* Apply fade-in animation */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px; /* Limit form width */
  margin: 0 auto; /* Center form horizontally */
  animation: ${fadeIn} 1s ease-in; /* Apply fade-in animation */
  box-sizing: border-box; /* Ensure padding and borders are included in the width */

  input,
  select,
  button {
    width: 100%; /* Make sure inputs and button have the same width */
    padding: 12px; /* Increased padding for better visual consistency */
    margin: 10px 0; /* Space between inputs and button */
    font-size: 1rem;
    border-radius: 5px;
    border: 2px solid #333;
    background-color: #fff;
    color: #000;
    box-sizing: border-box; /* Include padding and borders in the width */
    transition: border 0.3s ease-in-out;
  }

  input,
  select {
    border-color: #333; /* Input and select border color */
    &:focus {
      border-color: #ff6600; /* Sleek orange */
      outline: none;
    }
  }

  button {
    background-color: #ff6600; /* Sleek orange */
    color: #000;
    border: none;
    font-weight: bold;
    transition: background-color 0.3s ease-in-out;

    &:hover {
      background-color: #cc5200; /* Darker orange */
    }
  }
`;

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'listener' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert('Registration successful');
    } catch (error) {
      console.error(error);
      alert('Registration failed');
    }
  };

  return (
    <Container>
      <Header>
        <Title>Soundspace</Title>
      </Header>
      <RegisterHeader>Register</RegisterHeader>
      <Form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <select name="role" onChange={handleChange}>
          <option value="listener">Listener</option>
          <option value="artist">Artist</option>
        </select>
        <button type="submit">Register</button>
      </Form>
    </Container>
  );
};

export default Register;
