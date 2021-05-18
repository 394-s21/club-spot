import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Card } from 'react-native-paper';

const CommonCompClubCard = ({clubName, clubDesc, clubCategory, clubEmail, navigation, clubId}) => {
    const LeftContent = () => <Image style={styles.clubImage} source={{uri: 'https://www.ieee.org/content/dam/ieee-org/ieee/web/org/about/whatis/71858.gif'}}/>;
    
    const viewClub = (navigation,name,desc,category,email,id)=>{
      navigation.navigate('Club Details',{clubName:name, clubDesc:desc, clubCategory:category, clubEmail:email, clubId: id })
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
      padding: 10,
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