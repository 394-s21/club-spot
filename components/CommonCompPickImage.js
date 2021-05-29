import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import 'firebase/storage';
//import * as firebase from 'firebase/app';
import {firebase} from '../utils/firebase';

const CommonCompPickImage = (imageInput)=>{
    const [image,setImage] = useState(imageInput);
    console.log(image);
    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
            //return uriToBlob(result.uri);
        }
        return result;
    };

    const uriToBlob = (uri) => {

        return new Promise((resolve, reject) => {
    
          const xhr = new XMLHttpRequest();
    
          xhr.onload = function() {
            // return the blob
            resolve(xhr.response);
          };
          
          xhr.onerror = function() {
            // something went wrong
            reject(new Error('uriToBlob failed'));
          };
    
          // this helps us get a blob
          xhr.responseType = 'blob';
    
          xhr.open('GET', uri, true);
          xhr.send(null);
    
        });
    
      }

    const uploadToFirebase = (blob) => {

        return new Promise((resolve, reject)=>{
    
          var storageRef = firebase.storage().ref();
    
          storageRef.child('uploads/photo.jpg').put(blob, {
            contentType: 'image/jpeg'
          }).then((snapshot)=>{
    
            blob.close();
    
            resolve(snapshot);
    
          }).catch((error)=>{
    
            reject(error);
    
          });
    
        });
    };

    const handlePickingUpload = ()=>{
      pickImage().then(
        (result)=>{
          if (!result.cancelled){
            return uriToBlob(result.uri);
          }
        }
      ).then(
        (blob)=>{
          //console.log(blob);
          return uploadToFirebase(blob);
        }
      ).then(
        (snapshot)=>{
          console.log('File uploaded');
        }
      ).catch(
        (error)=>{
          throw error;
        }
      );

    }
    
    

    if(!image){
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Image source= {require('../assets/clubLogo.png')} style={{ width: 200, height: 200 }} />
              <Button title="Pick an image from camera roll" onPress={handlePickingUpload} />
            </View>
        );

    }
    else{
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Image source= {{uri:image}} style={{ width: 200, height: 200 }} />
              <Button title="Pick an image from camera roll" onPress={handlePickingUpload} />
            </View>
        );

    }

    
}

export default CommonCompPickImage;