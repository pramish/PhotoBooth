import React from "react";
import styled from "styled-components";
import categories from "../../../data/categories";

const Categories = () => {
  return (
    <Wrapper>
      {categories.map(category => (
        <div>
          <div className="img-wrapper">
            <img src={category.img} alt={category.name} />
          </div>
          <p>{category.name}</p>
        </div>
      ))}
    </Wrapper>
  );
};

export default Categories;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  overflow: auto;
  height: 9rem;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  .img-wrapper {
    height: 5rem;
    width: 9rem;
    background-size: cover;
    background-position: center;
    padding: 1rem;
  }
  img {
    width: 100%;
    border-radius: 0.8rem;
    object-fit: cover;
  }
  p {
    margin: 0;
    text-align: center;
  }
`;
