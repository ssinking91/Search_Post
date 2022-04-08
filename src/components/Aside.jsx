import styled from "styled-components";
import PropTypes from "prop-types";

import LoadingAside from "./LoadingAside";
import { useGetAsideCached } from "../hooks/useGetAsideCached";

const Aside = ({ asideKey }) => {
  // asideKey = { target }
  const [data, isLoading] = useGetAsideCached(asideKey);

  // 정규표현식 : /패턴/플래그
  // category_names : ['c1.tops', 'c2.tops', 'c3.knitwear']
  const filterCategory = (category_names) => {
    return category_names
      .filter((c) => c.includes("c1"))
      .map((c) => c.replace(/c1\./gi, ""));
  };

  // Object.entries(obj) : 객체의 키와 값을 [key, value]의 배열로 반환(객체 ==> 2차원 배열)
  // [{style: ''}, {season: ''}, {occasion: ''}, {fabric: ''}, {sense: ''}, {pattern: ''}]
  const transAttribute = (attributes) => {
    return attributes.map((v) => {
      const [key, value] = Object.entries(v)[0];
      return [key, value];
    });
  };

  return (
    <AsideContainer>
      {isLoading && <LoadingAside />}
      {!isLoading && !data && <></>}
      {!isLoading && data && (
        <>
          <AsideImg src={data.image_url} />
          <H1>ITEMS</H1>
          <CateUl>
            {filterCategory(data.category_names).map((v, idx) => (
              <CateLi key={idx}>{v}</CateLi>
            ))}
          </CateUl>
          <Hr />
          <H1>Attributes</H1>
          <AttrUl>
            {transAttribute(data.attributes).map(([key, value], idx) => (
              <AttrLi key={idx}>
                <AttrKey>{`#${key}`}</AttrKey>
                <AttrVal>{value}</AttrVal>
              </AttrLi>
            ))}
          </AttrUl>
        </>
      )}
    </AsideContainer>
  );
};

Aside.propTypes = {
  asideKey: PropTypes.string,
};

const AsideContainer = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  gap: 20px;
  width: 320px;
  box-sizing: border-box;
`;
const AsideImg = styled.img`
  object-fit: cover;
  width: inherit;
`;
const H1 = styled.h1`
  font-size: 20px;
  font-weight: bold;
`;

const CateUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const CateLi = styled.li`
  display: inline-block;
  background-color: #bb78ff;
  color: white;
  font-size: 16px;
  padding: 4px 8px;
`;
const Hr = styled.hr`
  margin: 10px 0px;
  border-top: none;
  border-bottom: 0.5px solid lightgray;
`;

const AttrLi = styled.li`
  display: flex;
  flex-direction: column;
`;

const AttrUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const AttrKey = styled.h2`
  font-size: 16px;
  font-weight: bold;
  color: #bb78ff;
`;

const AttrVal = styled.h3`
  font-size: 14px;
`;

export default Aside;
