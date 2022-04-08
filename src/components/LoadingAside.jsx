import styled from "styled-components";
import Skeleton from "./Skeleton";

const LoadingAside = () => {
  return (
    <>
      <Skeleton>
        <Skeleton.Item type="square" width={280} height={400}></Skeleton.Item>
      </Skeleton>
      <Skeleton>
        <Skeleton.Item type="square" width={60} height={30}></Skeleton.Item>
      </Skeleton>
      <Skeleton>
        <Skeleton.Item type="square" width={40} height={30}></Skeleton.Item>
      </Skeleton>
      <Hr />
      <Skeleton>
        <Skeleton.Item type="square" width={40} height={30}></Skeleton.Item>
      </Skeleton>
      <AttrSkel>
        <Skeleton.Item type="square" width={100} height={30}></Skeleton.Item>
        <Skeleton.Item type="square" width={50} height={30}></Skeleton.Item>
        <Skeleton.Item type="square" width={70} height={30}></Skeleton.Item>
        <Skeleton.Item type="square" width={50} height={30}></Skeleton.Item>
        <Skeleton.Item type="square" width={100} height={30}></Skeleton.Item>
        <Skeleton.Item type="square" width={100} height={30}></Skeleton.Item>
      </AttrSkel>
    </>
  );
};

const Hr = styled.hr`
  margin: 10px 0px;
  border-top: none;
  border-bottom: 0.5px solid lightgray;
`;

const AttrSkel = styled(Skeleton)`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export default LoadingAside;
