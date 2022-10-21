import styled from "styled-components";

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const StyledInput = styled.input`
  color: rgb(36, 35, 42);
  font-size: 16px;
  line-height: 20px;
  min-height: 28px;
  border-radius: 4px;
  padding: 8px 16px;
  border: 2px solid transparent;
  background: rgb(251, 251, 251);
  transition: all 0.1s ease 0s;

  :focus {
    border: 2px solid rgb(124, 138, 255);
  }
`;

export const Label = styled.label`
  font-size: 14px;
  line-height: 16px;
  margin-bottom: 4px;
`;

export const Required = styled.span`
  content: '*';
  color: #ff0000;
`;

export const Error = styled.span`
  color: #ff0000;
  font-size: 14px;
  margin-top: 4px;
`;
