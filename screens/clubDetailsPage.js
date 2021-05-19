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
            userInfo: {},
            clubmember: false,
            userId: firebase.auth().currentUser.uid
        }
        this.handleEmailClick = this.handleEmailClick.bind(this)
        this.groupButton = this.groupButton.bind(this)
        this.leaveClub = this.leaveClub.bind(this)
        this.leaveSuccessfully = this.leaveSuccessfully.bind(this)
    }

    joinFailed() {
        Alert.alert(
            "Join Club Failed",
            "You have already joined this club.",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );
    }

    joinSuccessfully() {
        Alert.alert(
            "Joined Club Successfully",
            "You are now part of this club.",
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
                this.setState({clubMember: true})
            } else {
                if(snapshot.val().hasOwnProperty(clubId)){
                    console.log(`found the club ${clubId}`);
                    this.joinFailed()
                } else{
                    console.log(`not found the club ${clubId}`);
                    this.joinSuccessfully()
                    clubRef.child(clubId).set(1);
                    this.setState({clubMember: true})
                }
            } 
        })
    }


    leaveFailed() {
        Alert.alert(
            "Failed to Leave Club",
            "Unable to leave club due to error.",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );
    }

    leaveSuccessfully() {
        Alert.alert(
            "Left Club Successfully",
            "You have now left the club.",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );
    }

    leaveClub() {
        const clubId = this.state.clubId;
        const userId = this.state.userId;
        const userClub = firebase.database().ref('/users/'+userId+'/clubs/'+clubId);
        userClub.remove()
        const user = this.state.userInfo
        console.log('old user: ',user)
        delete user.clubs[clubId]
        this.setState({userInfo: user, clubMember: false});
        console.log('new user: ',user)
        console.log('club removed from user')
        this.leaveSuccessfully()
    }



    handleEmailClick() {
        const str = 'mailto:'+this.state.clubEmail
        console.log('str: ',str)
        Linking.openURL(str)
    }

    componentDidMount() {
        const userId = firebase.auth().currentUser.uid;
        const clubId = this.state.clubId;
        const db = firebase.database().ref('/users/'+userId);
        var user = {}
        db.on('value', (snapshot) => {
        if (snapshot.exists()) {
            user = snapshot.toJSON();
            console.log('user: ',user);
            if (Object.keys(user).includes("clubs") && Object.keys(user.clubs).includes(clubId)) {
                this.setState({clubMember: true})
                console.log('member of this club')
            }
            else {
                this.setState({clubMember: false})
                console.log('NOT a member of this club')
            }
        }
        this.setState({userInfo: user
                    })
        //console.log('userInfo: ',this.state.userInfo)
        });
    }
    

    groupButton() {
        const mem = this.state.clubMember
        if (mem === true) {
            return (
                <Button style={styles.button} mode="outlined" onPress = {this.leaveClub} > Leave This Club </Button>
            )
        }
        else {
            return (<Button style={styles.button} mode="outlined" onPress = {this.joinClub}> Join This Club </Button>)
        }
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
                    {this.groupButton()}
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