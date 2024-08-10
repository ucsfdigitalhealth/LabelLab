import React, {useState} from "react";

import styled from "styled-components/native";
import HeaderCom from "../components/HeaderCom";
import HeroCom from "../components/HeroCom";
import TabsCom from "../components/TabsCom";
import VideoUpload from "../components/VideoUpload"
import { StatusBar } from "react-native";
import api from "../services/api";

const Container = styled.View`
  flex: 1;
  background: transparent;
`;

const HomeScreen = () => {
  const [videoUploadShown, setVideoUploadShown] = useState(false);

  const setVisibilityFromChild = (vis) => {
    console.log(vis)
    setVideoUploadShown(vis)
  }

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Container>
        <HeaderCom />
        <VideoUpload display={videoUploadShown}/>
        <HeroCom videos={api} />
        <TabsCom isUploadMenuVisible={setVisibilityFromChild}/>
      </Container>
    </>
  );
};

export default HomeScreen;
