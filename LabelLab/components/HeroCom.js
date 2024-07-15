import React, { useState, useEffect} from "react";
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

const HeroCom = ({ videos }) => {
  const [selected, setSelected] = useState(0);
  const [prevSelected, setPrevSelected] = useState(0);
  const [hashtagData, setHashtagData] = useState({});
  const [isRelatedToHashtag, setIsRelatedToHashtag] = useState(false)
  const [userScrolled, setUserScrolled] = useState(false);
  const videoContainerHeight = height;

  const setHashtagFromChild = (data, isRelated) => {
    setHashtagData({...data})
    if (isRelated === "yes") {
      setIsRelatedToHashtag(true)
    } else {
      setIsRelatedToHashtag(false)
    }
  }

  useEffect(() => {
    sendHashtagData()
  }, [selected])

  async function sendHashtagData() {
    // console.log(JSON.stringify(item))
    if (Object.keys(hashtagData).length > 0) {
      console.log("Official: sending data");
      console.log("Video ID is " + videos[prevSelected].id.toString())
      fetch('https://labellab.up.railway.app/new', {
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
        console.log('successfully added ' + JSON.stringify(data))
         // after the API call is made, update the previous index.
      })
      setPrevSelected(selected)
    } else {
      setPrevSelected(selected)
    }
  }
  
  const renderItem = ({ item, index }) => {
    // setCurrentVidID(item.id.toString())
    console.log(JSON.stringify(videos[prevSelected].id))
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

  return (
    <Container>
      <FlatList
        data={videos}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={({ viewableItems }) => {
          // sendHashtagData(viewableItems);
          if (viewableItems && viewableItems.length > 0) {
            setSelected(viewableItems[0].index);
          }
          // setCurrentVidID(viewableItems[0].item.id.toString());
          // setUserScrolled(true)
        }}
        viewabilityConfig={{ itemVisiblePercentThreshold: 80 }}
      />
    </Container>
  );
};

export default HeroCom;
