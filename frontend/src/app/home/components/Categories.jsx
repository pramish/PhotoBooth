import React from "react";
import styled from "styled-components";
import categories from "../../../data/categories";

const Categories = () => {
  return (
    <Wrapper>
      <div className="container">
        {categories.map(category => (
          <div>
            <div className="img-wrapper">
              <img src={category.img} alt={category.name} />
            </div>
            <p>{category.name}</p>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default Categories;
const Wrapper = styled.div`
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  .container {
    height: 38rem;
  }
  .img-wrapper {
    background-size: cover;
    background-position: center;
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
