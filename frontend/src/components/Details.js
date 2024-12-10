import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [detailData, setDetailData] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    // Fetch movie data
    fetch(`https://backend-java-latest.onrender.com/movies/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Movie not found');
        }
      })
      .then((data) => {
        setDetailData(data);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, [id]);

  const handlePlayClick = () => {
    setShowPlayer(true); // Show the player
    setIsPlaying(true);  // Start playing the video
  };

  const handleBackClick = () => {
    setShowPlayer(false); // Hide the video player
    setIsPlaying(false);  // Stop the video from playing
  };

  return (
    <Container>
      <Header />
      <Background>
        <img alt={detailData.title} src={detailData.backgroundImg} />
      </Background>

      {!showPlayer ? (
        <>
          <ImageTitle>
            <img alt={detailData.title} src={detailData.titleImg} />
          </ImageTitle>
          <ContentMeta>
            <Controls>
              <PlayButton onClick={handlePlayClick}>
                <img src="/images/play-icon-black.png" alt="play" />
                <span>Play</span>
              </PlayButton>
            </Controls>
            <SubTitle>{detailData.subTitle}</SubTitle>
            <Description>{detailData.description}</Description>
          </ContentMeta>
        </>
      ) : (
        <VideoContainer>
          <VideoPlayer ref={videoRef} controls autoPlay={isPlaying}>
            <source src={detailData.videoFileLocation} type="video/mp4" />
            Your browser does not support the video tag.
          </VideoPlayer>
          <BackButton onClick={handleBackClick}>Back</BackButton>
        </VideoContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 250px);
  padding: 0 calc(3.5vw + 5px);
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
  opacity: 0.8;
  img {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }
`;

const ImageTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 0 auto;
  padding-top: 100px;
  height: 30vw;
  padding-bottom: 24px;
  width: 100%;
  img {
    width: 35vw;
    max-width: 600px;
    border-radius: 15px;
  }
`;

const ContentMeta = styled.div`
  max-width: 874px;
`;

const Controls = styled.div`
  margin: 24px 0;
`;

const PlayButton = styled.button`
  font-size: 15px;
  margin: 0px 22px 0px 0px;
  padding: 0px 24px;
  height: 56px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(249, 249, 249);
  border: none;
  color: rgb(0, 0, 0);
  img {
    width: 32px;
  }
  &:hover {
    background: rgb(198, 198, 198);
  }
`;

const SubTitle = styled.div`
  color: rgb(249, 249, 249);
  font-size: 15px;
`;

const Description = styled.div`
  line-height: 1.4;
  font-size: 20px;
  padding: 16px 0;
  color: rgb(249, 249, 249);
`;

const VideoContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const VideoPlayer = styled.video`
  max-width: 80%;
  max-height: 80vh;
  background-color: black;
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 10px 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

export default Detail;
