import styled from "styled-components";
import { Text } from "../../global.styles";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  border: 1px solid #aaaaaa;
  overflow: hidden;
  max-height: calc(100vh - 120px);
`;
export const ChatHeader = styled.header`
  padding: 20px;
  background-color: #4338ca;
  color: #ffffff;
  display: flex;
`;
export const JoinedUserInfo = styled.div``;
export const ChatBody = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #fff;
  overflow-y: auto;
`;
export const ChatFooter = styled.footer`
  background-color: #ffffff;
`;
export const UserTypingTextStyled = styled(Text)`
  margin: 0 5px;
`;
