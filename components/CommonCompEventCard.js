import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const CommonCompEventCard = ({title, description, address, date, time}) => {

    const getDateString = () => {
        var dateObj = new Date(date)
        var month = dateObj.getMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        return (month + "/" + day + "/" + year)
    }
    
    const getTimeString = () => {
        var timeObj = new Date(time)
        var hour = timeObj.getHours();
        var minute = timeObj.getMinutes();
        var half = " AM"
        if (hour > 12){
            hour =  hour - 12
            half = " PM"
        }
        return (hour + ":" + minute + half)
    }

    return(
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ width: "25%", alignItems: "center" }}>
                        <Image style={styles.clubImage} source={require('../assets/clubLogo.png')} />
                    </View>
                    <View style={{ flexDirection: "column", width: "75%" }}>
                        <Text style={styles.title}>{title}  </Text>
                        <Text style={styles.address}>{address}</Text>
                        <Text style={styles.address}>Date: {getDateString()}  Time: {getTimeString()}</Text>
                        <Text>{description}</Text>
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