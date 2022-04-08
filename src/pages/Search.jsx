import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import Aside from "../components/Aside";
import Header from "../components/Header";
import PostSection from "../components/PostSection";

import useGetQs from "../hooks/useGetQs";
import { regexImg } from "../utilities/regExp.js";

const Search = () => {
  const { target, option } = useGetQs("target", "option");

  const [isLoading, setIsLoading] = useState(false);
  const [prodData, setProdData] = useState([]);

  const [posts, setPosts] = useState([]);

  const fetchProdData = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        "https://static.pxl.ai/problem/data/products.json"
      );

      // data = [{...}, ...]
      setProdData(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProdData();
  }, []);

  useEffect(() => {
    // production.json 값이 없음
    if (!prodData) {
      console.log(prodData);
      return;
    }

    switch (option) {
      // keyword 검색
      case "keyword":
        if (target) {
          const filteredArr = [];
          prodData.map((value) => {
            if (value.name.includes(target)) {
              filteredArr.push(value);
            }
          });
          setPosts(filteredArr);
        } else {
          console.log("err");
        }
        break;

      // url 혹은 product_id 검색
      case "code":
        if (target) {
          // url 검색 일때
          if (regexImg.test(target)) {
            const filteredArr = [];
            let prodName = "";
            // url에 해당하는 아이템의 name을 찾는다.
            prodData.map((value) => {
              if (value.image_url.includes(target)) {
                prodName = value.name;
              }
            });
            if (prodName) {
              const tmpSplitArr = prodName.split("_", 1);
              prodName = tmpSplitArr[0];
              prodData.map((value) => {
                if (value.name.includes(prodName)) {
                  filteredArr.push(value);
                }
              });
            }
            setPosts(filteredArr);

            // product_id 검색일때
          } else if (!isNaN(Number(target))) {
            const filteredArr = [];
            let prodName = "";
            // product_id에 해당하는 아이템의 name을 찾는다.
            prodData.map((value) => {
              if (value.product_code === Number(target)) {
                prodName = value.name;
              }
            });

            if (prodName) {
              const tmpSplitArr = prodName.split("_", 1);
              prodName = tmpSplitArr[0];
              prodData.map((value) => {
                if (value.name.includes(prodName)) {
                  filteredArr.push(value);
                }
              });
            }
            setPosts(filteredArr);
          }
        }
        break;
      default:
        console.log(`${option} error`);
    }
  }, [prodData, option, target]);

  return (
    <div>
      <Header loading={isLoading} />
      <SearchContainer>
        {option === "code" && target && posts.length > 0 && (
          <Aside asideKey={target} />
        )}
        <PostSection posts={posts} loading={isLoading} />
      </SearchContainer>
    </div>
  );
};

const SearchContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export default Search;
