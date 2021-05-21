import React, { Component } from 'react';
import { StyleSheet, View, Image, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Avatar,Provider, TextInput, RadioButton,Text, Subheading,Title, Card, Button,Paragraph, Dialog, Portal } from 'react-native-paper';

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
            userId: firebase.auth().currentUser ? firebase.auth().currentUser.uid : "testAdminId", //backdoor token (remove in production)
            edit: false,
            newCat: this.props.route.params.clubCategory,
            newDescription: this.props.route.params.clubDesc,
            newName: this.props.route.params.clubName

        }
        this.handleEmailClick = this.handleEmailClick.bind(this)
        this.groupButton = this.groupButton.bind(this)
        this.leaveClub = this.leaveClub.bind(this)
        this.leaveSuccessfully = this.leaveSuccessfully.bind(this)
        this.editButton = this.editButton.bind(this)
        this.edit = this.edit.bind(this)
        this.save = this.save.bind(this)
        this.cancel = this.cancel.bind(this)
        this.contactClubButton = this.contactClubButton.bind(this)
        this.descriptionDisplay = this.descriptionDisplay.bind(this)
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
        const userId = this.state.userId; // find current userId
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
        delete user.clubs[clubId]
        this.setState({userInfo: user, clubMember: false});
        this.leaveSuccessfully()
    }



    handleEmailClick() {
        const str = 'mailto:'+this.state.clubEmail
        Linking.openURL(str)
    }

    componentDidMount() {
        const userId = this.state.userId;
        const clubId = this.state.clubId;
        const db = firebase.database().ref('/users/'+userId);
        var user = {}
        db.on('value', (snapshot) => {
        if (snapshot.exists()) {
            user = snapshot.toJSON();
            console.log('user: ',user);
            if (Object.keys(user).includes("clubs") && Object.keys(user.clubs).includes(clubId)) {
                this.setState({clubMember: true,
                userInfo: user})
                console.log('member of this club')
            }
            else {
                this.setState({clubMember: false,
                userInfo: user})
                console.log('NOT a member of this club')
            }
        }
        //this.setState({userInfo: user
         //           })
        //console.log('userInfo: ',this.state.userInfo)
        });
    }
    

    groupButton() {
        const mem = this.state.clubMember
        const admin = this.state.userInfo.admin
        const clubAdmin = this.state.userInfo.clubAdminId
        const currClub = this.state.clubId
        if (mem === true) {
            return (
                <Button style={styles.button} mode="outlined" onPress = {this.leaveClub} > Leave This Club </Button>
            )
        }

        else if (currClub === clubAdmin) {
            return (null)
        }
        else {
            return (<Button style={styles.button} mode="outlined" onPress = {this.joinClub}> Join This Club </Button>)
        }
    }

    edit = () => {
        this.setState({edit: true})
    }

    save = () => {
        this.setState({edit: false})
        const db = firebase.database().ref('/clubs/'+this.state.clubId)
        const newDesc = this.state.newDescription
        db.child('/description').set(newDesc)
        this.setState({clubDesc: newDesc})
    }
    cancel = () => {
        const oldDesc = this.state.clubDesc
        this.setState({edit: false,
                        newDescription: oldDesc})
    }

    editButton() {
        const admin = this.state.userInfo.admin
        const clubAdmin = this.state.userInfo.clubAdminId
        const currClub = this.state.clubId
        //console.log('clubAdminId: ',clubAdmin)
        //console.log('currClub: ',currClub)
        if (currClub === clubAdmin) {
            return (
                <Button style={styles.button} mode="outlined" onPress = {this.edit} > Edit Club Description</Button>
            )
        }
        else {
            return (null)
        }
    }

    contactClubButton() {
        const admin = this.state.userInfo.admin
        const clubAdmin = this.state.userInfo.clubAdminId
        const currClub = this.state.clubId
        //console.log('clubAdminId: ',clubAdmin)
        //console.log('currClub: ',currClub)
        if (currClub !== clubAdmin) {
            return (
                <Button style={styles.button} mode="outlined" compact="true" onPress = {this.handleEmailClick}>CONTACT CLUB</Button>
            )
        }
        else {
            return (null)
        }
    }

    descriptionDisplay() {
        if (this.state.clubDesc !== "") {
            return (
                <Card style={styles.card}>
                        <Card.Content>
                        <Text>{this.state.clubDesc}</Text>
                        </Card.Content>
                    </Card>
            )
        }
        else {
            return (
                <Card style={styles.card}>
                        <Card.Content>
                        <Text>No description available.</Text>
                        </Card.Content>
                    </Card>
            )
        }
    }


    render(){

        const edit = this.state.edit


        if (edit) {
            return (
                
                <SafeAreaView style={styles.container}>
                    <ScrollView>
                        <Text style = {styles.title}>
                        {this.state.clubName}
                            {'\n'}
                        </Text>

                        <Card style={styles.card}>
                            <Card.Content>
                            <Text>Category: {this.state.clubCategory}</Text>
                               
                            </Card.Content>
                        </Card>
                        <Card style={styles.card}>
                            <Card.Content>
                            <Text>Email: {this.state.clubEmail}</Text>
                               
                            </Card.Content>
                        </Card>
                        <Card style={styles.card}>
                            <Card.Content>
                            <TextInput mode="flat"
                                        label="Description"
                                        value={this.state.newDescription}
                                        dense="true"
                                        multiline="true"
                                        onChangeText={text => this.setState({newDescription:text})} />
                            </Card.Content>
                        </Card>
                        <Button style={styles.button} mode="outlined" onPress = {this.save} > Save </Button>
                        <Button style={styles.button} mode="outlined" onPress = {this.cancel} > Cancel </Button>
                        

                        
                    </ScrollView>
                </SafeAreaView>

            )
        }
        else {

            return(
                <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.container}>
                    <Title style={styles.subheading}>{this.state.clubName}</Title>
                    </View>
                    <Subheading>CATEGORY</Subheading>
                    <Card style={styles.card}>
                        <Card.Content>
                        <Text>{this.state.clubCategory}</Text>
                        </Card.Content>
                    </Card>
                    <Subheading>EMAIL</Subheading>
                    <Card style={styles.card}>
                        <Card.Content>
                        <Text>{this.state.clubEmail}</Text>
                        </Card.Content>
                    </Card>
                    <Subheading>DESCRIPTION</Subheading>
                    {this.descriptionDisplay()}
                    {this.contactClubButton()}
                    {this.groupButton()}
                    {this.editButton()}
                </ScrollView>
                </SafeAreaView>


            ) }
    }

}

const styles = StyleSheet.create({
    subheading: {
        fontWeight: "600",
        height: 35,
        marginTop: 20,
        marginBottom: 10,
        width: 350,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1'
    },
    card: {
        marginTop: 5,
        marginBottom: 5,
        backgroundColor:'white',
        width: 350
    },
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
