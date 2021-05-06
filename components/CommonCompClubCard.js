import React, {Component} from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Card } from 'react-native-paper';

const CommonCompClubCard = () => {
    const LeftContent = () => <Image style={styles.clubImage} source={{uri: 'https://www.ieee.org/content/dam/ieee-org/ieee/web/org/about/whatis/71858.gif'}}/>
  
    return(
        <View style={styles.container}>
            <Card style={{backgroundColor: 'white'}}>
                <Card.Title style={styles.cardContent}
                left={LeftContent}
                leftStyle={styles.imageContainer}
                title="Club Name" 
                subtitle="Completed: 1/6 w style={styles.container}>
                <Card style={{backgroundColor: 'green', flexDirection: 'row'}}>
                    <Card.Title style={styles.cardContent}
                    left={() => <Image style={styles.clubImage} source={{uri: 'https://www.ieee.org/content/dam/ieee-org/ieee/web/org/about/whatis/71858.gif'}}/>}
                    title=" 
                />
            </Card>
        </View>
      );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    clubImage: {
      borderRadius: 25,
      borderWidth: 2,
      width: 50,
      height: 50
    },
    imageContainer: {
      paddingHorizontal: 10,
      //borderWidth: 2,
      width: 70
    },
  });
  export default CommonCompClubCard;