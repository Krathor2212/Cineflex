import React from 'react';
import Header from './Header';
import ImgSlider from './ImgSlider';
import styled from "styled-components";
import MOriginals from './MOriginals';
import MTrending from './MTrending';
import MSeries from './MSeries';


const Marvel = () => {
    return (
        <Container>
            <Header />
            <ImgSlider />
            <MTrending />
            <MOriginals />
            <MSeries />
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

export default Marvel;