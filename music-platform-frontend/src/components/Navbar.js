import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MusicImage from '../pages/MMImage.jpeg'; // Adjust the path accordingly
import '@fontsource/montserrat';

// Styled components
const Nav = styled.nav`
  display: flex;
  align-items: center;
  background: transparent;
  padding: 10px;
  color: #fff;
  font-family: 'Montserrat', sans-serif; /* Montserrat font */
  justify-content: space-between; /* Distribute space between items */
  width: 80%;
  margin: auto;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 50px;
  height: auto;
  border-radius: 5px;
  margin-right: 10px;
`;

const LogoText = styled.h1`
  font-size: 1.6rem;
  color: #ff6600; /* Sleek orange */
  margin: 0;
  font-weight: 600; /* Adjust weight as needed */
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  flex-grow: 1; /* Allow the list to grow and take available space */
  justify-content: space-evenly; /* Center the navigation items */
`;

const NavItem = styled.li`
  margin: 0 25px; /* Increase margin for more spacing between items */
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;

  &:hover {
    text-decoration: underline;
  }
`;

const LogoutButton = styled.button`
  background-color: #ff6600;
  color: #000;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1.2rem;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #000;
    color: #ff6600;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <Nav>
      <LogoContainer>
        <LogoImage src={MusicImage} alt="Music logo" />
        <LogoText>Soundspace</LogoText>
      </LogoContainer>
      <NavList>
        {role === 'artist' ? (
          <>
            <NavItem>
              <StyledLink to="/my-songs">My Songs</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink to="/upload-songs">Upload Songs</StyledLink>
            </NavItem>
          </>
        ) : (
          <>
            <NavItem>
              <StyledLink to="/view-songs">My Songs</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink to="/marketplace">Marketplace</StyledLink>
            </NavItem>
          </>
        )}
      </NavList>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </Nav>
  );
};

export default Navbar;
