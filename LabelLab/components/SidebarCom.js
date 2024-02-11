import React, { useState } from "react";
import styled from "styled-components/native";

const Container = styled.View`
  width: 60px;
  height: 100%;
  padding-bottom: 59px;
  justify-content: flex-end;
`;
const Menu = styled.View`
  margin: 9px 0;
  align-items: center;
`;
const User = styled.View`
  width: 48px;
  height: 48px;
  margin-bottom: 13px;
`;
const Avatar = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 48px;
  border-width: 2px;
  border-color: #ffffff;
`;
const Icon = styled.Image`
  height: 40px;
`;
const Count = styled.Text`
  color: #fff;
  font-size: 12px;
  letter-spacing: -0.1px;
`;

const LikeIcon = styled.TouchableOpacity`
  margin-top: 1px;
`;

const SoundBg = styled.View`
  background: #1f191f;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
  margin-bottom: 10px;
`;
const Sound = styled.Image`
  width: 25px;
  height: 25px;
  border-radius: 25px;
`;

const SidebarCom = ({ avatar, count }) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <Container>
      <Menu>
        <User>
          <Avatar resizeMode="cover" source={avatar} />
        </User>
      </Menu>

      <Menu>
        <LikeIcon onPress={toggleLike}>
          <Icon
            resizeMode="contain"
            source={
              liked
                ? require("../assets/icons/like_red.png")
                : require("../assets/icons/like.png")
            }
          />
        </LikeIcon>
        <Count>{count.like}</Count>
      </Menu>

      <Menu>
        <Icon
          resizeMode="contain"
          source={require("../assets/icons/comment.png")}
        />
        <Count>{count.comment}</Count>
      </Menu>

      <Menu>
        <Icon
          resizeMode="contain"
          source={require("../assets/icons/share.png")}
        />
        <Count>{count.share}</Count>
      </Menu>

      <Menu>
        <SoundBg>
          <Sound resizeMode="cover" source={avatar} />
        </SoundBg>
      </Menu>
    </Container>
  );
};

export default SidebarCom;
