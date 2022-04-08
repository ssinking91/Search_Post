import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Posts from "./Posts";
import PaginationBtn from "./PaginationBtn";

const PostSection = ({ posts, loading }) => {
  // Pagination Current Page
  const [currentPage, setCurrentPage] = useState(1);

  // Post 60 per page
  const [postsPerPage] = useState(60);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;

  // Current Page Posts
  const currentPosts = (wholePost) => {
    const currentPosts = wholePost.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [posts]);

  return (
    <PostsWrapper>
      <Posts posts={currentPosts(posts)} loading={loading}></Posts>
      {posts.length > 0 && (
        <PaginationBtn
          totalPages={Math.ceil(posts.length / postsPerPage)}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </PostsWrapper>
  );
};

PostSection.propTypes = {
  posts: PropTypes.array,
  loading: PropTypes.bool,
};

const PostsWrapper = styled.div`
  min-width: 320px;
  width: calc(100% - 320px);
`;
export default PostSection;
