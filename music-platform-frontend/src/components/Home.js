import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import MusicImage from '../pages/MMImage.jpeg'; // Adjust the path accordingly
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
  padding: 50px;
  min-height: 100vh;
  background: linear-gradient(135deg, #000 0%, #333 100%); /* Diagonal gradient from black to dark grey */
  color: #fff;
  font-family: 'Montserrat', sans-serif; /* Montserrat font */
`;

const Title = styled.h1`
  font-size: 4rem;
  color: #ff6600; /* Sleek orange */
  text-align: center;
  margin-bottom: 50px;
  font-weight: 600; /* Adjust weight as needed */

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* Center the content */
  padding: 0 100px;

  @media (max-width: 1200px) {
    padding: 0 50px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 20px;
  }
`;

const TextContainer = styled.div`
  text-align: center; /* Center text */
  margin-bottom: 30px;
  max-width: 800px; /* Limit text width */
  width: 100%; /* Full width within max-width */
  padding: 0 20px; /* Add padding to avoid text touching the edges */
  animation: ${fadeIn} 1s ease-in; /* Shortened fade-in animation */
`;

const Text = styled.p`
  font-size: 1.6rem;
  color: #ccc;
  margin-bottom: 40px;
  line-height: 1.6;
  font-weight: 400; /* Adjust weight as needed */
`;

const AuthLinks = styled.div`
  display: flex;
  justify-content: center; /* Center the buttons */
  gap: 20px; /* Add space between buttons */
  animation: ${fadeIn} 1s ease-in; /* Shortened fade-in animation */

  a {
    text-decoration: none;
    padding: 12px 30px;
    border: 2px solid #ff6600;
    background-color: #ff6600;
    color: #000;
    font-weight: bold;
    border-radius: 5px;
    font-size: 1rem;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: #000;
      color: #ff6600;
      border: 2px solid #ff6600;
    }
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  
  img {
    width: 100%;
    max-width: 450px;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    border: 2px solid #ff6600;
    animation: ${fadeIn} 1s ease-in; /* Shortened fade-in animation */
  }

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const Home = () => {
  return (
    <Container>
      <Title>Soundspace</Title>
      <Content>
        <TextContainer>
          <Text>Buy and sell music directly from your favorite artists. Find exclusive content and support creators.</Text>
          <AuthLinks>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </AuthLinks>
        </TextContainer>
        <ImageWrapper>
          <img src={MusicImage} alt="Abstract Music Visualization" />
        </ImageWrapper>
      </Content>
    </Container>
  );
};

export default Home;
