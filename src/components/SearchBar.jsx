import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";
import styled from "styled-components";
import _ from "lodash";

import { regexKeyword, regexCode, regexImg } from "../utilities/regExp.js";

const SearchBar = ({ loading }) => {
  const navigation = useNavigate();

  const [searchOption, setSearchOption] = useState("keyword");
  const [userInput, setUserInput] = useState("");

  // Query String으로 router
  const navigateToSearch = useCallback(() => {
    if (userInput !== "") {
      navigation(`/search?option=${searchOption}&target=${userInput}`);
    }
  }, [navigation, searchOption, userInput]);

  const handleSearchChange = (e) => {
    // 키워드 검색
    if (regexKeyword.test(e.target.value)) {
      setSearchOption("keyword");
      setUserInput(e.target.value);
    }
    // url 검색
    else if (regexImg.test(e.target.value)) {
      setSearchOption("code");
      setUserInput(e.target.value);
    }
    // product_id 검색
    else if (regexCode.test(e.target.value)) {
      setSearchOption("code");
      setUserInput(e.target.value);
    }
  };

  // 검색시 debounce
  const debounce = _.debounce((e) => handleSearchChange(e), 200);
  const debounceSearch = useCallback(debounce, [debounce]);

  // Enter키 기능
  const handleSearchKeyUp = useCallback(
    (e) => {
      if (e.key === "Enter") {
        navigateToSearch();
      }
    },
    [navigateToSearch]
  );

  return (
    <SearchBarContainer>
      <SearchBarItem>
        <SearchBarInput
          type="text"
          placeholder="검색어를 입력하세요..."
          onChange={(e) => debounceSearch(e)}
          onKeyUp={(e) => handleSearchKeyUp(e)}
          disabled={loading}
        />
        <SearchBarButton onClick={() => navigateToSearch()}>
          검색
        </SearchBarButton>
      </SearchBarItem>
    </SearchBarContainer>
  );
};

SearchBar.propTypes = {
  loading: PropTypes.bool,
};

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  width: 40vw;
`;

const SearchBarItem = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: auto;
  margin-bottom: 15px;
  border-radius: 20px;
  box-shadow: 0px 0px 15px 0px #c8c8c8;
`;

const SearchBarInput = styled.input`
  width: calc(100% - 75px);
  height: 40px;
  font-size: 14px;
  padding: 0 25px;
  border-radius: 20px 0 0 20px;
  border: none;
  &:focus {
    outline: none;
  }
`;

const SearchBarButton = styled.button`
  width: 75px;
  background: #8e4ff8;
  color: white;
  border-radius: 0 20px 20px 0;
  border: none;
  font-size: 14px;
  &:hover {
    cursor: pointer;
    background: #b081ff;
  }
`;

export default SearchBar;
