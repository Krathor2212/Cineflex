import React from 'react';
import Header from './Header';
import ImgSlider from './ImgSlider';
import Viewer from './Viewers';
import Recommends from './Recommends';
import styled from "styled-components";
import Originals from './Originals';
import Trending from './Trending';
import Series from './Series';


const Home = () => {
    return (
        <Container>
            <Header />
            <ImgSlider />
            <Viewer />
            <Recommends />
            <Originals />
            <Trending />
            <Series />
        </Container>
    );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;