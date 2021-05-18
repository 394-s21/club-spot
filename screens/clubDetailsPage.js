import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import {firebase} from '../utils/firebase';
import { Linking } from 'react-native'

class clubDetailsPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            clubName : this.props.route.params.clubName,
            clubDesc : this.props.route.params.clubDesc,
            clubCategory: this.props.route.params.clubCategory,
            clubEmail: this.props.route.params.clubEmail,
            clubId: this.props.route.params.clubId,
        }
        this.handleEmailClick = this.handleEmailClick.bind(this)
    }

    joinFailed() {
        Alert.alert(
            "Join Group Failed",
            "You have already joined this group.",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );
    }

    joinSuccessfully() {
        Alert.alert(
            "Join Group Successfully",
            "You are now part of the group.",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );
    }

    joinClub = () => {
        const clubId = this.state.clubId; // save a local copy of clubId
        const userId = firebase.auth().currentUser.uid; // find current userId
        // check if the user has already joined in club
        const clubRef = firebase.database().ref('/users/' + userId + '/clubs');
        clubRef.once("value")
        .then(snapshot => {
            if(snapshot === null || snapshot.val() === null){ // user's first time join a club
                console.log(`user's first time`)
                this.joinSuccessfully()
                clubRef.child(clubId).set(1); // set user's clubId ref to be 1 (indicate the user is joined)
            } else {
                if(snapshot.val().hasOwnProperty(clubId)){
                    console.log(`found the club ${clubId}`);
                    this.joinFailed()
                } else{
                    console.log(`not found the club ${clubId}`);
                    this.joinSuccessfully()
                    clubRef.child(clubId).set(1);
                }
            } 
        })
    }

    handleEmailClick() {
        const str = 'mailto:'+this.state.clubEmail
        console.log('str: ',str)
        Linking.openURL(str)
    }

    render(){
        return(
            <View style={styles.backcover}>
            <SafeAreaView>
                <ScrollView>
                    <View style = {styles.view}>
                    <Text style = {styles.title}>
                    {this.state.clubName}
                        {'\n'}
                    </Text>
                    <Text style = {styles.subtitle}>
                        Category:
                    </Text>
                    <Text style = {styles.clubDescription}>
                        {this.state.clubCategory}
                        {'\n'}
                    </Text>
                    <Text style = {styles.subtitle}>
                        Email:
                    </Text>
                    <Text style = {styles.email}>
                        {this.state.clubEmail}
                        {'\n'}
                    </Text>
                    <Text style = {styles.subtitle}>
                        Description:
                    </Text>
                    <Text style = {styles.clubDescription}>
                        {this.state.clubDesc}
                    </Text>
                    <Button style={styles.button} mode="outlined" compact="true" onPress = {this.handleEmailClick}>CONTACT CLUB</Button>
                    <Button style={styles.button} mode="outlined" onPress = {this.joinClub}> Join This Club </Button> 
                    </View>
                    
                </ScrollView>
            </SafeAreaView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    button: {
        marginTop: 10
    },
    title: {
      fontSize: 22,
      paddingTop: 10,
      fontWeight: 'bold'
    },
    subtitle:{
      fontSize: 16,
      fontWeight: 'bold'
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
      marginBottom: 5
    },
    card: {
      height: 100
    },
    email:{
    color:'blue',
    textDecorationLine:'underline'
    },
    view:{
        padding:20,
        backgroundColor: 'white'
    },
    backcover:{
        backgroundColor: 'white'
    }
  });

export default clubDetailsPage;