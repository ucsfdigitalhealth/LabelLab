import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  margin: 0 0 85px 13px;
`;

const User = styled.View`
  flex-direction: row;
  align-items: center;
`;

const UserName = styled.Text`
  font-size: 17px;
  color: rgba(255, 255, 255, 1);
  text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.1);
  font-weight: bold;
  letter-spacing: -0.3px;
`;

const Checked = styled.Image`
  width: 16px;
  height: 16px;
  margin: 0 5px;
`;

const HashtagContainer = styled.View`
  background-color: ${(props) =>
    props.active ? "rgba(0, 128, 0, 0.5)" : "rgba(128, 128, 128, 0.8)"};
  border-radius: 10px;
  padding: 5px 10px;
  margin-top: 15px;
  margin-right: 5px;
`;

const HashtagText = styled.Text`
  font-size: 17px;
  color: ${(props) => (props.active ? "white" : "black")};
  font-weight: bold;
  letter-spacing: -0.2px;
`;

const Music = styled.View`
  width: 80%;
  margin-top: 15px;
  margin-bottom: 10px;
  flex-direction: row; 
  align-items: center;
`;

const FeatherIcon = styled(Feather)`
  margin-right: 10px;
  color: #fff;
`;

const MusicText = styled.Text`
  font-size: 15px;
  color: #fff;
`;

const HorizontalScroll = styled.ScrollView`
  flex-grow: 0;
  flex-shrink: 0;
`;

const InfoCom = ({ user }) => {
  const [activeHashtags, setActiveHashtags] = useState([]);

  const toggleHashtag = (hashtag) => {
    if (activeHashtags.includes(hashtag)) {
      setActiveHashtags(activeHashtags.filter((h) => h !== hashtag));
    } else {
      setActiveHashtags([...activeHashtags, hashtag]);
    }
  };

  const hashtags = user.hashtag.split(", ");

  return (
    <Container>
      <User>
        <UserName>@{user.username}</UserName>
        <Checked source={require("../assets/icons/checked.png")} />
      </User>
      <HorizontalScroll horizontal>
        {hashtags.map((tag, index) => (
          <TouchableOpacity key={index} onPress={() => toggleHashtag(tag)}>
            <HashtagContainer active={activeHashtags.includes(tag)}>
              <HashtagText active={activeHashtags.includes(tag)}>
                {tag}
              </HashtagText>
            </HashtagContainer>
          </TouchableOpacity>
        ))}
      </HorizontalScroll>
      <Music>
        <FeatherIcon name="music" size={13} />
        <MusicText>{user.music}</MusicText>
      </Music>
    </Container>
  );
};

export default InfoCom;
