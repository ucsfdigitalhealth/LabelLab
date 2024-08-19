import React, { useState, useEffect, useRef } from "react";
import { Dimensions, View, FlatList, Text } from "react-native";
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

const ngrokURL = "https://9de9-2603-800c-1101-5658-dd7c-a03d-1151-dee2.ngrok-free.app/" // <-- change this
const HeroCom = ({ videos }) => {
  const [selected, setSelected] = useState(0);
  const [prevSelected, setPrevSelected] = useState(0);
  const [hashtagData, setHashtagData] = useState({});
  const [isRelatedToHashtag, setIsRelatedToHashtag] = useState(false)
  const [userScrolled, setUserScrolled] = useState(false);
  const videoContainerHeight = height;

  const setHashtagFromChild = (data, isRelated) => {
    console.log("setting hashtags from child")
    setHashtagData({...data})
    if (isRelated === "yes") {
      setIsRelatedToHashtag(true)
    } else {
      setIsRelatedToHashtag(false)
    }

    console.log("hashtagData after it's been set from child: " + JSON.stringify(hashtagData))
  }

  useEffect(() => {
    sendHashtagData()
  }, [selected])

  async function sendHashtagData() {
    // console.log(JSON.stringify(item))
    if (Object.keys(hashtagData).length > 0) {
      fetch(`${ngrokURL}new`, {
        method: 'POST',
        body: JSON.stringify({
          videoID: videos[prevSelected].id.toString(),
          htData: hashtagData,
          isRelated: isRelatedToHashtag
        }),
        headers: {
            'Content-Type': 'application/json'
        },
      }).then((data) => {
        console.log('successfully added')
         // after the API call is made, update the previous index.
      })
      setPrevSelected(selected)
      setHashtagData({})
    } else {
      setPrevSelected(selected)
    }
  }
  
  const renderItem = ({ item, index }) => {
    // setCurrentVidID(item.id.toString())
    return(
      <View style={{ height: videoContainerHeight * 1.05 }}>
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
          {/* <Text style={{color: "white"}}>{selected} | {currentVidID}</Text> */}
          <InfoCom user={item.user} category={item.category} retrieveStateFromChild={setHashtagFromChild}/>
          <SidebarCom avatar={item.user.avatar} count={item.count} />
        </Center>
      </Gradient>
    </View>
    )
    
  };
  const onViewableItemsChanged=({ viewableItems }) => {
    // sendHashtagData(viewableItems);
    if (viewableItems && viewableItems.length > 0) {
      // sendHashtagData()
      setSelected(viewableItems[viewableItems.length-1].index);
    }
    // setCurrentVidID(viewableItems[0].item.id.toString());
    // setUserScrolled(true)
  }

  const viewabilityConfigCallbackPairs = useRef([{ onViewableItemsChanged }])

  return (
    <Container>
      <FlatList
        data={videos}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        viewabilityConfig={{ itemVisiblePercentThreshold: 80 }}
      />
    </Container>
  );
};

export default HeroCom;
