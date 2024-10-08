import React from "react";

import styled from "styled-components/native";

const Container = styled.View`
  top: 30px;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: absolute;
  z-index: 1;
`;
const Menu = styled.Text`
  color: #fff;
  letter-spacing: 0.8px;
  margin: 11px 12px;
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
  opacity: ${(props) => (props.bold ? 1 : 0.8)};
  font-size: ${(props) => (props.bold ? "16px" : "15px")};
`;
const Separator = styled.View`
  width: 1px;
  height: 13px;
  background-color: #d8d8d8;
  opacity: 0.6;
`;

const HeaderCom = () => {
  return (
    <Container style={{display: "none"}}>
      <Menu>Following</Menu>
      <Separator />
      <Menu bold="true">For you</Menu>
    </Container>
  );
};

export default HeaderCom;
