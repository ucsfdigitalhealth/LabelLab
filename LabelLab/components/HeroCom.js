import React, { useState } from "react";
import { Dimensions, View, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient/build/LinearGradient";
import styled from "styled-components/native";
import VideoPlayerCom from "../components/VideoPlayerCom";
import InfoCom from "../components/InfoCom";
import SidebarCom from "../components/SidebarCom";

const { height } = Dimensions.get("window");

const Container = styled.View`
  flex: 1;
`;

const Gradient = styled(LinearGradient)`
  height: 100%;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
`;

const Center = styled.View`
  flex: 1;
  flex-direction: row;
`;

const HeroCom = ({ videos }) => {
  const [selected, setSelected] = useState(0);
  const videoContainerHeight = height;

  const renderItem = ({ item, index }) => (
    <View style={{ height: videoContainerHeight * 1.06 }}>
      <VideoPlayerCom
        video={item.video}
        poster={item.poster}
        isPlay={selected === index}
      />
      <Gradient
        locations={[0, 0.26, 0.6, 1]}
        colors={[
          "rgba(26,26,26,1)",
          "rgba(26,26,26,0)",
          "rgba(26,26,26,0)",
          "rgba(26,26,26,1)",
        ]}
      >
        <Center>
          <InfoCom user={item.user} />
          <SidebarCom avatar={item.user.avatar} count={item.count} />
        </Center>
      </Gradient>
    </View>
  );

  return (
    <Container>
      <FlatList
        data={videos}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={({ viewableItems }) => {
          if (viewableItems && viewableItems.length > 0) {
            setSelected(viewableItems[0].index);
          }
        }}
        viewabilityConfig={{ itemVisiblePercentThreshold: 90 }}
      />
    </Container>
  );
};

export default HeroCom;
