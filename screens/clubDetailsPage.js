import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import {firebase} from '../utils/firebase'

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
    }

    joinClub = () => {
        const clubId = this.state.clubId; // save a local copy of clubId
        const userId = firebase.auth().currentUser.uid; // find current userId
        console.log(userId)
        const userRef = firebase.database().ref('/users/' + userId); // create a user db reference
        userRef.child('/clubs/' + clubId).set(1); // set user's clubId ref to be 1 (indicate the user is joined)
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
                    </View>
                    <Button onPress = {this.joinClub}> Join This Club </Button> 
                </ScrollView>
            </SafeAreaView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
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