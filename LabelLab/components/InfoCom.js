import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";
import {
  TouchableOpacity,
  Modal,
  View,
  TextInput,
  Button as RNButton,
} from "react-native";

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
  margin-top: 6px;
  margin-right: 5px;
`;

const HashtagText = styled.Text`
  font-size: 17px;
  color: ${(props) => (props.active ? "white" : "black")};
  font-weight: bold;
  letter-spacing: -0.2px;
`;

const Music = styled.Text`
  font-size: 15px;
  color: #fff;
  margin-top: 13px;
  width: 80%;
`;

const HorizontalScroll = styled.ScrollView`
  flex-grow: 0;
  flex-shrink: 0;
`;

const QuestionContainer = styled.View`
  margin-top: 10px;
`;

const QuestionText = styled.Text`
  font-size: 16px;
  color: #fff;
  margin-bottom: 5px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  margin-top: 5px;
`;

const Button = styled.TouchableOpacity`
  padding: 8px 15px;
  background-color: ${(props) => (props.active ? "#00FF00" : "#808080")};
  border-radius: 5px;
  margin-right: 10px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

const ModalContent = styled.View`
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  padding: 20px;
  margin-top: 80px;
`;

const ButtonContainerModal = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;

const ButtonModal = styled.TouchableOpacity`
  padding: 10px 20px;
  background-color: #00ff00;
  border-radius: 5px;
`;

const ButtonTextModal = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

const RatingInput = styled.TextInput`
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
`;

const InfoCom = ({ user, category, retrieveStateFromChild }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [selectedHashtag, setSelectedHashtag] = useState(null);
  const [ratings, setRatings] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const toggleHashtag = (hashtag) => {
    setSelectedHashtag(hashtag);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedHashtag(null);
  };

  const handleRatingSubmit = () => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [selectedHashtag.substring(1)]: rating,
    }));
    
    setModalVisible(false);
  };

  useEffect(() => {
    retrieveStateFromChild(ratings, selectedAnswer);
  }, [ratings, selectedAnswer])
  

  const handleToggleHashtag = (hashtag) => {
    setSelectedHashtag(hashtag);
    setRating(ratings[hashtag] || 0);
    setModalVisible(true);
  };

  const handleAnswer = (ans) => {
    setSelectedAnswer(ans);
  };

  const hashtags = user ? user.hashtag.split(", ") : [];

  return (
    <Container>
      <User>
        <UserName>@{user.username}</UserName>
        <Checked source={require("../assets/icons/checked.png")} />
      </User>
      <QuestionContainer>
        <QuestionText>
          Do you think this video is related to the "{category}" category?
        </QuestionText>
        <ButtonContainer>
          <Button
            active={selectedAnswer === "yes"}
            onPress={() => handleAnswer("yes")}
          >
            <ButtonText>Yes</ButtonText>
          </Button>
          <Button
            active={selectedAnswer === "no"}
            onPress={() => handleAnswer("no")}
          >
            <ButtonText>No</ButtonText>
          </Button>
        </ButtonContainer>
      </QuestionContainer>
      <QuestionContainer>
        <QuestionText>
          Rate each hashtag's relevance to this video from 0 to 10.
        </QuestionText>
      </QuestionContainer>
      <HorizontalScroll horizontal>
        {hashtags.map((tag, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleToggleHashtag(tag)}
          >
            <HashtagContainer active={ratings[tag] !== undefined}>
              <HashtagText>{tag}</HashtagText>
            </HashtagContainer>
          </TouchableOpacity>
        ))}
      </HorizontalScroll>
      <Music>
        <Feather name="music" size={13} />
        {user.music}
      </Music>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}
      >
        <ModalContent>
          <QuestionText>
            Rate the relevance of "{selectedHashtag}" on a scale of 0 to 10:
          </QuestionText>
          <RatingInput
            keyboardType="numeric"
            value={isNaN(rating) ? '' : rating.toString()}
            onChangeText={(text) => setRating(parseInt(text))}
            placeholder="Enter rating (0-10)"
            placeholderTextColor="#888"
          />
          <ButtonContainerModal>
            <ButtonModal onPress={handleRatingSubmit}>
              <ButtonTextModal>Submit</ButtonTextModal>
            </ButtonModal>
            <ButtonModal onPress={handleModalClose}>
              <ButtonTextModal>Cancel</ButtonTextModal>
            </ButtonModal>
          </ButtonContainerModal>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default InfoCom;
