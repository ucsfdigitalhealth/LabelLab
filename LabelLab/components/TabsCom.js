import React from "react";

import { LinearGradient } from "expo-linear-gradient";

import { Dimensions, View } from "react-native";

import { Feather } from "@expo/vector-icons";

import styled from "styled-components/native";

const { height } = Dimensions.get("window");

const Container = styled.View`
  height: ${height * 0.07}px;
  width: 100%;
  position: absolute;
  bottom: 10;
  z-index: 1;
  border-top-width: 1px;
  border-top-color: rgba(255, 255, 255, 0.2);
  flex-direction: row;
`;
const Menu = styled.TouchableOpacity`
  width: 20%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const Icon = styled.Image.attrs({ resizeMode: "contain" })`
  height: 32px;
`;
const MenuText = styled.Text`
  font-size: 9px;
  margin-top: -3px;
  color: ${(props) => (props.active ? "#fff" : "rgba(255,255,255,0.6)")};
`;
const Border = styled(LinearGradient)`
  width: 44px;
  height: 28px;
  border-radius: 8px;
  align-items: center;
`;
const Button = styled.View`
  width: 36px;
  height: 28px;
  background: #fff;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

const TabsCom = () => {
  return (
    <Container>
      <Menu>
        <Icon source={require("../assets/icons/home.png")} />
        <MenuText active="true">Home</MenuText>
      </Menu>

      <Menu>
        <Icon source={require("../assets/icons/discover.png")} />
        <MenuText onclick>Explore</MenuText>
      </Menu>

      <Menu>
        <Border
          start={{ x: 1, y: 0 }}
          locations={[0, 0.5, 0.5, 1]}
          colors={["#F42365", "#f42365", "#37d7cf", "#37d7cf"]}
        >
          <Button>
            <Feather name="plus" size={20} />
          </Button>
        </Border>
      </Menu>

      <Menu>
        <Icon source={require("../assets/icons/message.png")} />
        <MenuText>Messages</MenuText>
      </Menu>

      <Menu>
        <Icon source={require("../assets/icons/profile.png")} />
        <MenuText>Profile</MenuText>
      </Menu>
    </Container>
  );
};

export default TabsCom;
