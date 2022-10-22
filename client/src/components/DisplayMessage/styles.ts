import styled from "styled-components";
import { Text } from "../../global.styles";

export const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  padding: 10px;
  margin-bottom: 5px;
  background-color: #d1d1d1;
  border-radius: 5px;
  max-width: 65%;
`;

export const MessageText = styled(Text)`
  margin: 5px 0;
`;

export const TimeStamp = styled(Text)`
  font-size: 10px;
  margin: 0;
`;
