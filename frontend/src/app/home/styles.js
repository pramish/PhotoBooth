import styled from "styled-components";
export const Container = styled.div`
  display: grid;
  grid-template-columns: 15% 35% 40% 10%;
  grid-auto-rows: minmax(10px, auto);
  color: white;
  grid-template-areas:
    "title navbtns navbtns profile"
    "side-categories main-feeds main-feeds side-artist";
  .side-categories {
    grid-area: side-categories;
    padding: 1rem;
    display: grid;
    grid-auto-columns: minmax(0, auto);
    grid-template-rows: 0.4fr auto 0fr;
    .top-trendings {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      /* align-items: center; */
      margin-bottom: 2rem;
      div {
        display: flex;
        justify-content: space-between;
        /* align-items: flex-start; */
      }
    }
  }
  .main-feeds {
    grid-area: main-feeds;
    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    display: grid;
    align-items: center;
    grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
    grid-gap: 1rem;
    height: 90vh;
    margin-top: 1rem;
    padding-left: 1rem;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .side-artist {
    grid-area: side-artist;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    img {
      height: 2rem;
      width: 2rem;
      margin: 0.4em;
    }
  }
  .title {
    text-align: center;
    grid-area: title;
  }
  .navbtns {
    grid-area: navbtns;
    display: flex;
    justify-content: space-around;
    align-items: center;
    div {
      display: flex;
      width: 20rem;
      justify-content: space-around;
      align-items: center;
    }
  }
  .profile {
    grid-area: profile;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      height: 2rem;
      width: 2rem;
    }
  }
  h4 {
    margin: 0;
    font-size: 1.4rem;
    text-decoration: none;
    font-style: normal;
    color: white;
  }
`;
