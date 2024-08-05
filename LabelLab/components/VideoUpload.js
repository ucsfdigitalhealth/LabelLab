import { ScrollView, RefreshControl, Text,  View, Alert, Pressable} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
// import Video from './react-native-video';
import { useEffect, useState } from 'react'
import styled from "styled-components/native";
// import axios from 'axios';
// import Loader from './Components/Loader.js';

const UploadVideoText = styled.Text`
    font-size: 30px;
    text-align: center;
    width: 100%;
    margin: 4% auto 4% auto;
`

const VideoFields = styled.View`
    width: 90%;
    margin: 0 5% 0 5%;
`
const QuestionText = styled.Text`
    font-size: 12px;
    margin-bottom: 1%;
`

const VideoFieldInput = styled.TextInput`
    font-size: 15px;
    padding: 0.25% 0.5% 0.25% 0.5%;
    border-radius: 2px;
    margin-bottom: 5%;
    border: 1px solid black;
`

const UploadMediaBtn = styled.Text`
    text-align: center;
    font-size: 20px;
    padding: 2% 0% 2% 0%;
    font-weight: bold;
    background-color: #00FF00;
    color: white;
`

const VideoPreview = styled.View`
    height: 200px;
    border: 2px dashed grey;
    margin-top: 10%;
`

const NoFileUploaded = styled.View`
    position: absolute;
    left: 20%;
    width: 60%;
    height: auto;
    text-align: center;
    alignItems: center;
    flex: 1;
    justifyContent: center;
`

const NoFileUploadedText = styled.Text`
    text-align: center;
    font-weight: bold;
    opacity: 0.8;
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
            setTemporaryVidURL(pickerResult.assets[0].uri)
        } catch (e) {
            console.log(e)
            console.log("something went wrong.")
        }
    }

    return (
        display && (
        <View className="h-full p-10 bg-white">
            <View style={{height: "3px", background: "linear-gradient(to right, skyblue, red)"}}></View>
            <UploadVideoText>Upload a video</UploadVideoText>
            <VideoFields>
                <QuestionText>Video Title</QuestionText>
                <VideoFieldInput placeholder="Video Title" onChangeText={(txt) => setVideoTitle(txt)} value={videoTitle}/>

                <QuestionText>Video Category:</QuestionText>
                <VideoFieldInput placeholder="e.g. DIY, sports, academic, other, etc..." onChangeText={(txt) => setVideoCategory(txt)} value={videoCategory}/>
                
                <QuestionText>Enter relevant hashtags (separate by comma or space):</QuestionText>
                <VideoFieldInput placeholder="e.g. running" onChangeText={(txt) => updateHashtag(txt)} value={currentHashtag}/>
                <View style={{flexDirection: "row", flexWrap: "wrap", marginBottom: "2"}}>
                    {enteredHashtags.map(hash => (<IndivHashtagText key={hash} onPress={() => removeHashtag(hash)} >{"#" + hash}</IndivHashtagText>))}
                </View>
                {enteredHashtags.length > 0 && <Text style={{color: "red", marginBottom: "3%"}}>Note: tap on a hashtag to remove it.</Text>}
                <Pressable onPress = {handleVideoUpload}>
                    <UploadMediaBtn>Select Video</UploadMediaBtn>
                </Pressable>
                
                <VideoPreview>
                    {temporaryVidURL == "" ? (
                        <NoFileUploaded>
                            <NoFileUploadedText>No File Uploaded</NoFileUploadedText>
                            <Text style={{textAlign: 'center'}}>When you upload a video, you'll see the preview here.</Text>
                        </NoFileUploaded>
                    ) : (
                        <View>
                            <Text>Confirming this works.</Text>
                            <Text>{temporaryVidURL}</Text>
                            <video src={temporaryVidURL}/>
                        </View>
                    )}
                </VideoPreview>
            </VideoFields>
        </View>)
    )
};

export default VideoUpload;