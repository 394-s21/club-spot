import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const CommonCompEventCard = ({title, description, address, date, time}) => {

    return(
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={{flexDirection: "row"}}>
                    <View style={{width: "25%", alignItems: "center"}}>
                        <Image style={styles.clubImage} source={require('../assets/clubLogo.png')}/>
                    </View>
                    <View style={{flexDirection: "column", width: "75%"}}>
                        <View style={{flexDirection: "row", width: "75%"}}>
                            <Text style={styles.title}>{title}  </Text>
                            <Text style={styles.address}>{address}</Text>
                        </View>
                        <Text>{description}</Text>
                        <Text>Date: {date}  Time: {time}</Text>
                    </View>
                </View>
            </View>
        </View>
      );
  };
  
  const styles = StyleSheet.create({
    title: {
      fontSize: 18,
      fontWeight: "bold"
    },
    address: {
        fontSize: 12
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
      justifyContent: 'center',
      margin: 10
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
      height: 100,
      width: "90%",
      backgroundColor: "white",
      borderRadius: 5,
      justifyContent: "center",
    },
  });
  export default CommonCompEventCard;