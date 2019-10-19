import styled from "styled-components";

export const HomeContainer = styled.div`
  .main-feeds {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-items: center;
  }
`;

export const EachContainer = styled.div`
color: black;
  cursor: pointer;
  display: grid;

  padding-bottom: 1.2rem;

  background-color: whitesmoke;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  
  .img-wrapper {
    height: 20rem;
    img {
      height: auto;
      max-height: 100%;
      width: 100%;
      object-fit: cover;
      height: 20rem;
      /* ${props =>
        props.toggle ? "object-fit: contain; margin-top: 1em;" : ""} */
    }
  }

  .details {
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .btns {
      display: flex;
      flex-direction: row;
    justify-content: space-around;
    }
  }
 
`;
