import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faVolumeUp } from '@fortawesome/free-solid-svg-icons'; // Icons for play, pause, and volume
import '@fontsource/montserrat'; // Import Montserrat font

// Styled components
const PlayerContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  width: 60%;
  transform: translateX(-50%);
  background: #000; /* Black background */
  padding: 20px;
  color: #fff;
  border: 2px solid #ff6600; /* Orange border */
  border-radius: 15px; /* Curved border */
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SongTitle = styled.div`
  font-size: 1.2rem;
  color: #ff6600; /* Orange text */
  margin-bottom: 10px;
  text-align: center;
  width: 100%;
`;

const PlayerControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%; /* Takes full width */
`;

const PlayerControls = styled.div`
  display: flex;
  align-items: center; /* Aligns play button and tracker vertically */
  flex-grow: 1; /* Takes up available space for centering */
  justify-content: center;
  padding-left:130px
`;

const PlayPauseButton = styled.button`
  background: #ff6600; /* Orange background */
  border: none;
  color: #000;
  padding: 8px; /* Small padding */
  border-radius: 5px;
  font-size: 1.2rem; /* Adjust icon size */
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: #ff4500; /* Darker orange on hover */
  }

  svg {
    color: #000; /* Icon color */
    font-size: 1.2rem;
  }
`;

const ProgressBar = styled.input`
  width: 70%; /* Longer progress bar */
  margin: 0 10px;
  cursor: pointer;
  appearance: none;
  height: 6px; /* Slimmer bar */
  background: #ff6600; /* Orange bar */
  border-radius: 5px; /* Rounded corners */
  outline: none;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #fff; /* White thumb */
    cursor: pointer;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
  }
`;

const VolumeControlContainer = styled.div`
  display: flex;
  align-items: center;
`;

const VolumeIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
  font-size: 1.2rem;
  color: #fff;
`;

const VolumeControl = styled.input`
  cursor: pointer;
  appearance: none;
  height: 6px;
  background: #ff6600; /* Orange color */
  border-radius: 5px;
  outline: none;
  width: 100px;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #fff;
    cursor: pointer;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
  }
`;

const CustomAudioPlayer = ({ src, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  useEffect(() => {
    // Auto play the song when loaded
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [src]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
  };

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(e.target.value);
  };

  const handleVolumeChange = (e) => {
    audioRef.current.volume = e.target.value;
    setVolume(e.target.value);
  };

  return (
    <PlayerContainer>
      <SongTitle>Now Playing: {title}</SongTitle>
      <PlayerControlsContainer>
        <PlayerControls>
          <PlayPauseButton onClick={togglePlayPause}>
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
          </PlayPauseButton>
          <ProgressBar
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
          />
        </PlayerControls>
        <VolumeControlContainer>
          <VolumeIcon icon={faVolumeUp} />
          <VolumeControl
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
        </VolumeControlContainer>
      </PlayerControlsContainer>
      <audio ref={audioRef} src={src} onTimeUpdate={handleTimeUpdate} />
    </PlayerContainer>
  );
};

export default CustomAudioPlayer;
