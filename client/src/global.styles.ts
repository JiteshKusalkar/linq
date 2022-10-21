import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #e5e5e5;
    padding: 20px;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;

export const Form = styled.form`
  width: 100%;
  max-width: 320px;
`;

export const Main = styled.main`
  min-height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
`;

// Typography
export const Heading = {
  H1: styled.h1``,
  H2: styled.h2``,
  H3: styled.h3``,
  H4: styled.h4``,
  H5: styled.h5``,
  H6: styled.h6``,
};

export const Text = styled.p``;
// Typography ends

export const Button = styled.button`
  cursor: pointer;
  outline: 0;
  color: #fff;
  background-color: #0d6efd;
  border-color: #0d6efd;
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  border: 1px solid transparent;
  padding: 6px 12px;
  font-size: 16px;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  :hover {
    color: #fff;
    background-color: #0b5ed7;
    border-color: #0a58ca;
  }
`;

export const MainHeading = styled(Heading.H1)`
  text-align: center;
`;
