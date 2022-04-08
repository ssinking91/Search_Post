import React from "react";
import styled from "styled-components";
import logo from "../images/logo_pxl.webp";
import SearchBar from "../components/SearchBar";

function Home() {
  return (
    <HomeContainer>
      <HomeLogo src={logo} />
      <Section>
        <SectionTitle>
          <span>Artificial Intelligence</span>
          <br />
          PXL <span>Fashion</span> Viewer
        </SectionTitle>
        <SearchBar />
      </Section>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const HomeLogo = styled.img`
  position: fixed;
  top: 30px;
  left: 30px;
  max-width: 150px;
  width: 20vw;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SectionTitle = styled.div`
  font-size: 32px;
  text-align: center;
  margin-bottom: 20px;
  span {
    white-space: nowrap; //자동 줄바꿈 방지
    font-weight: bold;
  }
`;

export default Home;
