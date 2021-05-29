import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Card } from 'react-native-paper';
import {firebase} from '../utils/firebase';

const CommonCompClubCard = ({clubName, clubDesc, clubCategory, clubEmail, imageReset ,navigation, clubId}) => {
    const [image,setImage] = useState();
    const LeftContent = () => {
      if(!imageReset){
        return(
        <Image style={styles.clubImage} source={require('../assets/clubLogo.png')}/>
        )
      }
      else{
        useEffect(() => {
          var imageRef = firebase.storage().ref('clubs/'+clubId+'.jpg')
          imageRef
            .getDownloadURL()
            .then((url) => {
              setImage(url);
            })
            .catch((e) => console.log('Errors while downloading => ', e));
        }, []);
        //console.log(url);
        return(
        <Image style={styles.clubImage} source={{uri:image}}/>)
      }
  };
    
    const viewClub = (navigation,name,desc,category,email,id)=>{
      navigation.navigate('Club Details',{clubName:name, clubDesc:desc, clubCategory:category, clubEmail:email, clubId: id, resetFlag: imageReset })
    }

    return(
        <View style={styles.container}>
            <Card 
            style={styles.card}
            onPress={()=>{viewClub(navigation,clubName,clubDesc,clubCategory,clubEmail, clubId)}}>
                <Card.Title
                left={LeftContent}
                leftStyle={styles.imageContainer}
                title={clubName}
                titleStyle={styles.title}
                subtitle={clubDesc}
                
                subtitleStyle={styles.clubDescription}
                subtitleNumberOfLines={2}
                />
                
            </Card>
        </View>
      );
  };
  
  const styles = StyleSheet.create({
    title: {
      fontSize: 18,
      paddingTop: 10
    },
    container: {
      flex: 1,
      paddingTop: 10,
      paddingBottom: 1,
      borderRadius: 40
    },
    clubImage: {
      borderRadius: 25,
      borderWidth: 2,
      width: 50,
      height: 50,
      marginTop: 15,
      alignContent: 'center',
      justifyContent: 'center'
    },
    imageContainer: {
      paddingHorizontal: 0,
      //borderWidth: 2,
      width: 60
    },
    clubDescription: {
      fontSize: 14,
      
    },
    card: {
      height: 100
    },
  });
  export default CommonCompClubCard;