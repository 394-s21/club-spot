import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Card } from 'react-native-paper';

const CommonCompMyClubCard = ({clubName, clubDesc, clubCategory, clubEmail, navigation, clubId, isViewClub}) => {
    const LeftContent = () => <Image style={styles.clubImage} source={require('../assets/clubLogo.png')}/>;
    
    const viewClub = (navigation,name,desc,category,email,id)=>{
      navigation.navigate('Club Announcement',{clubName:name, clubDesc:desc, clubCategory:category, clubEmail:email, clubId: id })
    }

    const createEvent = (navigation,name,desc,category,email,id)=>{
      navigation.navigate('Create Event',{clubName:name, clubId: id })
    }
    return(
        <View style={styles.container}>
            <Card 
            style={styles.card}
            onPress={()=>{isViewClub ? viewClub(navigation,clubName,clubDesc,clubCategory,clubEmail, clubId) : createEvent(navigation, clubName, clubId)}}>
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
      paddingBottom: 10,
      borderRadius: 40,
      alignItems: "center"
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
      width: 60
    },
    clubDescription: {
      fontSize: 14,
    },
    card: {
      height: 100,
      width: "90%",
      backgroundColor: "white",
      borderRadius: 5,
      justifyContent: "center",
    },
  });
  export default CommonCompMyClubCard;