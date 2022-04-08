import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import useGetQs from "../hooks/useGetQs";
import LoadingPost from "./LoadingPost";

const Posts = ({ posts, loading }) => {
  const { option, target } = useGetQs("option", "target");

  // 현지화를 위한 toLocaleString() : 지정된 지역에서 사용하는 숫자의 표현방식으로 문자열로 리턴
  const toPriceFormatOfKor = (price) => {
    return price.toLocaleString("ko-KR");
  };

  // <mark> 태그 사용하여 하이라이트(highlighted) 텍스트를 정의
  const MarkTarget = ({ productName }) => {
    if (option === "keyword" && typeof target === "string") {
      const splitTarget = productName.split(target);
      return (
        <>
          {splitTarget.map((_, idx) => {
            return _ === "" ? <mark key={idx}>{target}</mark> : _;
          })}
        </>
      );
    }
    return <>{productName}</>;
  };

  return (
    <>
      <SearchList>
        {loading && <LoadingPost />}
        {!loading && posts.length === 0 && (
          <NoSearch>검색 결과가 없습니다.</NoSearch>
        )}
        {!loading &&
          posts.map((post) => (
            <ItemContainer key={post.product_code}>
              <ItemImageBox>
                <ItemImg
                  src={post.image_url}
                  onClick={() => {
                    document.location = post.image_url;
                  }}
                />
              </ItemImageBox>
              <ItemInfoBox>
                <ItemTitle>
                  <MarkTarget productName={post.name} />
                </ItemTitle>
                <ItemCost>{toPriceFormatOfKor(post.price)} 원</ItemCost>
              </ItemInfoBox>
            </ItemContainer>
          ))}
      </SearchList>
    </>
  );
};

Posts.propTypes = {
  posts: PropTypes.array,
  loading: PropTypes.bool,
};

const SearchList = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15%, auto));
  grid-gap: 10px;
  @media screen and (max-width: 850px) {
    grid-template-columns: repeat(auto-fit, minmax(30%, auto));
  }
`;

const ItemContainer = styled.div`
  background-color: white;
  border: 1px solid #c9c9c9;
  border-radius: 10px;
  padding: 5px;
  box-shadow: 0px 0px 5px 0px #e5e5e5;
`;

const ItemImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 0.7;
  overflow: hidden;
  border-radius: 5px;
`;

const ItemImg = styled.img`
  object-fit: cover;
  border-radius: 5px;
`;

const ItemInfoBox = styled.div`
  margin-top: 10px;
  padding: 5px;
  display: block;
  background: #f4f4f4;
  border-radius: 5px;
  * {
    font-size: 14px;
  }
`;

const ItemTitle = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ItemCost = styled.p`
  text-align: right;
  color: #8e4ff8;
`;

const NoSearch = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5%;
  font: 18px "Noto Sans", "Noto Sans KR", sans-serif;
  font-weight: 600;
`;

export default Posts;
