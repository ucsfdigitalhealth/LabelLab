import { ScrollView, RefreshControl, Text,  View, Alert, Pressable, Dimensions } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Video, ResizeMode } from 'expo-av';
// import DocumentPicker from 'react-native-document-picker';
// import Video from 'react-native-video';
import React, { useEffect, useState } from 'react'
import styled from "styled-components/native";
// import axios from 'axios';
// import Loader from './Components/Loader.js';

const UploadVideoText = styled.Text`
    font-size: 30px;
    text-align: center;
    width: 100%;
    margin: 4% auto 4% auto;
`

const UploadVideoInstructions = styled.Text`
    color: white;
    font-size: 25px;
    text-align: center;
    width: 80%;
    margin: 3% auto 3% auto;
`

const VideoFields = styled.View`
    width: 100%;
    padding: 5%;
    position: absolute;
    top: 0;
    background-color: rgba(52, 52, 52, 0.8);

`
const QuestionText = styled.Text`
    font-size: 15px;
    color: white;
    margin-bottom: 1%
`

const VideoFieldInput = styled.TextInput`
    font-size: 20px;
    padding: 0.25% 0.5% 0.25% 0.5%;
    margin-bottom: 4%;
    border-radius: 2px;
    border: 1px solid grey;
    color: white;

`
const UploadMediaBtn = styled.Text`
    text-align: center;
    font-size: 20px;
    width: 100%;
    margin-top: 3%;
    padding: 2% 0% 2% 0%;
    font-weight: bold;
    background-color: cornflowerblue;
    color: white;
`

const MenuUploadNavigateBtn = styled.Text`
    text-align: center;
    font-size: 20px;
    margin: 1% 2% 1% 2%;
    padding: 2% 0% 2% 0%;
    color: white;
    width: 45%;
    border-radius: 5px;
    font-weight: bold;
`

const VideoPreview = styled.View`
    border: 2px dashed grey;
    margin-top: 0%;
`

const NoFileUploaded = styled.View`
    width: 60%;
    margin: 5% 20% 5% 20%;
    text-align: center;
    alignItems: center;
    justifyContent: center;
`

const NoFileUploadedText = styled.Text`
    text-align: center;
    font-weight: bold;
    opacity: 0.8;
    margin-top: 0;
    font-size: 20px;
    color: grey;
`

const IndivHashtagText = styled.Text`
    text-align: center;
    color: white;
    background-color: grey;
    padding: 1% 2.5% 1% 2.5%;
    font-size: 15px;
    margin: 0.25% 0.75% 0.25% 0.75%;
    border-radius: 5px;
    font-size: 15px;
`



const VideoUpload = (display) => {
    // related to video uploading.
    const [uploading, setUploading] = useState(false);
    const [temporaryVidURL, setTemporaryVidURL] = useState("")
    const [uploadedVideoTitle, setUploadedVideoTitle] = useState("")
    const [files, setFiles] = useState([])
    const [fetching, setFetching] = useState(false)
    const [refreshing, setRefreshing] = useState(false); 

    // related to video fields.
    const [videoTitle, setVideoTitle] = useState("")
    const [videoCategory, setVideoCategory] = useState("")
    const [currentHashtag, setCurrentHashtag] = useState("")
    const [enteredHashtags, setEnteredHashtags] = useState([])

    const updateHashtag = (val) => {
        // Note: protect against certain hashtags (like an empty one)
        const currHashtag = val
        if (currHashtag.substring(currHashtag.length-1) == "," || currHashtag.substring(currHashtag.length-1) == "#" || currHashtag.substring(currHashtag.length-1) == " ") {
            const hashtagList = [...enteredHashtags]
            hashtagList.push(currHashtag.substring(0, currHashtag.length-1))
            setCurrentHashtag("")
            setEnteredHashtags(hashtagList)
        } else {
            setCurrentHashtag(currHashtag)
        }
    }

    const removeHashtag = (hash) => {
        const newHashtags = [...enteredHashtags]
        const index = newHashtags.indexOf(hash)
        if (index == -1) {
            console.log("could not find hashtag.")
        } else {
            newHashtags.splice(index, 1)
            setEnteredHashtags(newHashtags)
        }
    }

    const handleVideoUpload = async () => {
        console.log(DocumentPicker)
        console.log("pp")
        try {
            const pickerResult = await DocumentPicker.getDocumentAsync({ type: 'video/*' })
            console.log(pickerResult)
            setVideoTitle(pickerResult.assets[0].name)
            setTemporaryVidURL(pickerResult.assets[0].uri)
            setUploadedVideoTitle(pickerResult.assets[0].name)
            // https://docs.expo.dev/versions/latest/sdk/video/
        } catch (e) {
            console.log(e)
            console.log("something went wrong.")
        }
    }
    const videoRef = React.useRef(null);

    return (
        display && (
        <ScrollView className="h-full p-10 bg-white">
            {temporaryVidURL == "" && <UploadVideoText>Upload a video</UploadVideoText>}
            <View style={{width: "100%", padding: 0}}>
                {temporaryVidURL == "" ? (
                    <VideoPreview>
                        <NoFileUploaded>
                            <NoFileUploadedText>No File Uploaded</NoFileUploadedText>
                            <Text style={{textAlign: 'center'}}>When you upload a video, you'll see the preview here.</Text>
                            <UploadMediaBtn onPress = {handleVideoUpload}>{temporaryVidURL == "" ? "Upload Video" : "Select Another Video"}</UploadMediaBtn>
                        </NoFileUploaded>
                    </VideoPreview>
                ) : (
                    <View style={{width: "100%", height: "auto", position: "relative"}}>
                         <Video source={{uri: temporaryVidURL}} 
                        ref={videoRef} 
                        shouldPlay
                        resizeMode='contain'
                        style={{width: Dimensions.get('window').width*1, height: "auto"}}
                        onReadyForDisplay={videoData => {
                            videoData.srcElement.style.position = "initial"
                          }}
                        useNativeControls isLooping/>

                        {temporaryVidURL != "" && <VideoFields>
                            <UploadVideoInstructions>Please fill out the fields.</UploadVideoInstructions>
                            <QuestionText>Video Title</QuestionText>
                            <VideoFieldInput placeholder="Video Title" placeholderTextColor="lightgray" onChangeText={(txt) => setVideoTitle(txt)} value={videoTitle}/>

                            <QuestionText>Video Category:</QuestionText>
                            <VideoFieldInput placeholder="e.g. DIY, sports, academic, other, etc..." placeholderTextColor="lightgray" onChangeText={(txt) => setVideoCategory(txt)} value={videoCategory}/>
                            
                            <QuestionText>Enter relevant hashtags (separate by comma or space):</QuestionText>
                            <VideoFieldInput placeholder="e.g. running" placeholderTextColor="lightgray" onChangeText={(txt) => updateHashtag(txt)} value={currentHashtag}/>
                            <View style={{flexDirection: "row", flexWrap: "wrap", marginBottom: "2"}}>
                                {enteredHashtags.map(hash => (<IndivHashtagText key={hash} onPress={() => removeHashtag(hash)} >{"#" + hash}</IndivHashtagText>))}
                            </View>
                            {enteredHashtags.length > 0 && <Text style={{color: "#fa3516", marginBottom: "3%", marginTop: "2%"}}>Note: tap on a hashtag to remove it.</Text>}
                            <View style={{display: "flex", justifyContent: "center", flexDirection: "row"}}>
                                <MenuUploadNavigateBtn style={{backgroundColor: "#fa3516"}} onPress = {handleVideoUpload}>Change Video</MenuUploadNavigateBtn>
                                <MenuUploadNavigateBtn style={{backgroundColor: "cornflowerblue"}}>Upload</MenuUploadNavigateBtn>
                            </View>
                        </VideoFields>}
                    </View>
                       
                )}
            </View>
        </ScrollView>)
    )
};

export default VideoUpload;