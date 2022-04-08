import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import PropTypes from "prop-types";

import logo from "../images/logo_pxl.webp";
import SearchBar from "./SearchBar";

const Header = ({ loading }) => {
  const navigation = useNavigate();
  return (
    <HeaderContainer>
      <ImageItem>
        <HeaderImage
          src={logo}
          onClick={() => {
            navigation("/");
          }}
        />
      </ImageItem>
      <SearchBar loading={loading} />
    </HeaderContainer>
  );
};

Header.propTypes = {
  loading: PropTypes.bool,
};

const HeaderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  padding: 30px 10px 10px 10px;
  background: white;

  @media screen and (max-width: 550px) {
    flex-direction: column;
  }
`;

const ImageItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 7vh;

  @media screen and (max-width: 550px) {
    margin-bottom: 20px;
  }
`;

const HeaderImage = styled.img`
  height: 80%;
  &:hover {
    cursor: pointer;
  }
`;

export default Header;
