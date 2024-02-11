import React from "react";

import styled from "styled-components/native";
import HeaderCom from "../components/HeaderCom";
import HeroCom from "../components/HeroCom";
import TabsCom from "../components/TabsCom";
import { StatusBar } from "react-native";
import api from "../services/api";

const Container = styled.View`
  flex: 1;
  background: transparent;
`;

const HomeScreen = () => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Container>
        <HeaderCom />
        <HeroCom videos={api} />
        <TabsCom />
      </Container>
    </>
  );
};

export default HomeScreen;
