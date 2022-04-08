import styled from "styled-components";
import Skeleton from "./Skeleton";

const LoadingPost = () => {
  const Item = () => (
    <SkeletonWrapper>
      <Skeleton>
        <Skeleton.Item
          type="square"
          width={"100%"}
          height={"25vh"}
        ></Skeleton.Item>
      </Skeleton>
      <Skeleton>
        <Skeleton.Item type="square" width={"100%"} height={70}></Skeleton.Item>
      </Skeleton>
    </SkeletonWrapper>
  );

  // Search.jsx의 화면에 보이는 post 개수는 12개 = Array.from({ length: 12 }, () => 0)
  return (
    <>
      {Array.from({ length: 12 }, () => 0).map((_, index) => (
        <Item key={index} />
      ))}
    </>
  );
};

const SkeletonWrapper = styled(Skeleton)``;

export default LoadingPost;
