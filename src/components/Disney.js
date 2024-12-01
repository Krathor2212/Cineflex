import React from 'react';
import Header from './Header';
import styled from "styled-components";
import DOriginals from './DOriginals';
import DTrending from './DTrending';
import DSeries from './DSeries';
import ImgSlider from './ImgSlider';


const Disney = () => {
    return (
        <Container>
            <Header />
            <ImgSlider />
            <DTrending />
            <DOriginals />
            <DSeries />
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

export default Disney;