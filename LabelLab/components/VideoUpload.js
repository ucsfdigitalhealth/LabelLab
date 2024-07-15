import { ScrollView, RefreshControl, Text,  View, Alert, Pressable} from 'react-native';
// import Video from 'react-native-video';
// import DocumentPicker from 'react-native-document-picker'
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
`

const NoFileUploadedText = styled.Text`
    text-align: center;
    font-weight: bold;
    opacity: 0.8;
    font-size: 20px;
    color: grey;
`
const VideoUpload = (display) => {
    // related to video uploading.
    const [uploading, setUploading] = useState(false);
    const [files, setFiles] = useState([])
    const [fetching, setFetching] = useState(false)
    const [refreshing, setRefreshing] = useState(false); 

    // related to video fields.
    const [enteredHashtags, setEnteredHashtags] = useState([])

    return (
        display && (
        <View className="h-full p-10 bg-white">
            <UploadVideoText>Upload a video</UploadVideoText>
            <VideoFields>
                <QuestionText>Video Title</QuestionText>
                <VideoFieldInput placeholder="Video Title"/>

                <QuestionText>Video Category:</QuestionText>
                <VideoFieldInput placeholder="e.g. DIY, sports, academic, other, etc..."/>
                
                <QuestionText>Enter relevant hashtags (separate by comma or space):</QuestionText>
                <VideoFieldInput placeholder="e.g. running"/>
                <View>
                    {enteredHashtags.map(hash => (<Text>{hash}</Text>))}
                </View>
                <UploadMediaBtn>Select Video</UploadMediaBtn>
                <VideoPreview>
                    {files.length == 0 ? (
                        <NoFileUploaded>
                            <NoFileUploadedText>No File Uploaded</NoFileUploadedText>
                            <Text style={{textAlign: 'center'}}>When you upload a video, you'll see the preview here.</Text>
                        </NoFileUploaded>) : (<View></View>)}
                </VideoPreview>
            </VideoFields>
             
            
        </View>)
    )
};

export default VideoUpload;