import styled from "styled-components";

export const StyledHome = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px 0px;
  overflow-y: scroll;

  & > div {
    width: 90%;
    max-width: 800px;
    background-color: white;
    border: 2px solid #dae3e8;
    display: flex;
    flex-direction: column;

    & > div {
      width: 100%;
      padding: 10%;
      display: flex;
      flex-direction: column;
      gap: 40px;

      form {
        width: 100%;
        padding: 0px 10%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 40px;
      }

      h2 {
        font-weight: bolder;
      }
    }
    section {
      width: 100%;
      background-color: #f7f9fa;
      padding: 30px;
      text-align: left;
      display: flex;
      flex-direction: column;
      color: #4b7fc0;
      gap: 50px;
      h3 {
        font-style: italic;
      }
    }

    @media (min-width: 768px) {
      flex-direction: row;

      & > div {
        width: 60%;
        height: 100%;
        padding: 60px;

        form {
          padding: 10px;
        }
      }
      section {
        width: 40%;
        padding: 90px 30px;
      }
    }
  }

  @media (min-width: 768px) {
    align-items: center;
  }
`;
