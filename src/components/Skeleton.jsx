import styled from "styled-components";

const Item = ({ type, width = 300, height = 300, ...props }) => {
  return (
    <Content type={type} width={width} height={height} {...props}></Content>
  );
};

const Content = styled.div`
  display: inline-block;
  border-radius: ${({ type }) => (type === "round" ? "50%" : "10px")};
  width: ${({ width }) => (typeof width === "number" ? `${width}px` : width)};
  height: ${({ height }) =>
    typeof height === "number" ? `${height}px` : height};
  background-image: linear-gradient(
    90deg,
    #dfe3e8 0px,
    #efefef 40px,
    #dfe3e8 80px
  );
  background-size: 200% 100%;
  background-position: 0 center;
  animation: skeleton--loading 2s infinite linear;
`;

// <Skeleton />
const Skeleton = ({ children, ...props }) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

const Wrapper = styled.div`
  width: inherit;
  @keyframes skeleton--loading {
    0% {
      background-position: 100%;
    }
    90% {
      background-position-x: -100%;
    }
    100% {
      background-position-x: -100%;
    }
  }
`;

// <Skeleton.Item />
Skeleton.Item = Item;

export default Skeleton;
