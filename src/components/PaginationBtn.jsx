import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

const PaginationBtn = ({ totalPages, currentPage, setCurrentPage }) => {
  const [pageState, setPageState] = useState([]);

  // Pagination pageState 생성
  useEffect(() => {
    const arr = [];
    new Array(totalPages).fill(0).forEach((_, idx) => {
      arr.push(idx + 1);
    });
    setPageState(arr);
  }, [currentPage, totalPages]);

  // PagiButton 클릭시 이벤트
  const handleCurrentPage = useCallback(
    (number) => {
      if (number > 0 && number < totalPages + 1) {
        setCurrentPage(number);
        window.scrollTo(0, 0);
      }
    },
    [totalPages, setCurrentPage]
  );

  return (
    <div>
      <nav>
        <PageContainer>
          <PagiButton
            onClick={() => handleCurrentPage(currentPage - 1)}
            isTarget={currentPage !== 1}
          >
            <GoChevronLeft />
          </PagiButton>
          {pageState.map((num) => (
            <li key={num}>
              <PagiButton
                onClick={() => {
                  if (num !== currentPage) handleCurrentPage(num);
                }}
                isTarget={currentPage === num}
              >
                {num}
              </PagiButton>
            </li>
          ))}
          <PagiButton
            onClick={() => handleCurrentPage(currentPage + 1)}
            isTarget={currentPage !== pageState.length}
          >
            <GoChevronRight />
          </PagiButton>
        </PageContainer>
      </nav>
    </div>
  );
};

PaginationBtn.propTypes = {
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
};

const PageContainer = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const PagiButton = styled.button`
  margin: 20px 0;
  width: 40px;
  height: 40px;
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => (props.isTarget ? "#8E4FF8" : "#d7c0ff")};
  * {
    margin: auto;
  }
`;

export default PaginationBtn;
