import React, { Component } from 'react';
import {firebase} from '../utils/firebase';
import { StyleSheet, View, Text, Image, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { Title } from 'react-native-paper';

class clubAnnouncementPage extends Component{
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
        userId: firebase.auth().currentUser ? firebase.auth().currentUser.uid : "testAdminId" //backdoor token (remove in production)
    }
  }
  goToChat = () => {
    console.log(`transition to ${this.state.clubId}`)
      const userId = firebase.auth().currentUser ? firebase.auth().currentUser.uid : "testAdminId"
      var userFirstName;
      firebase.database().ref('/users/' + userId).on('value', (snapshot) => {
        if (snapshot.exists()) {
          userFirstName = snapshot.val().first_name
        }
      })
      console.log(`data is ${userFirstName}`)
      this.props.navigation.navigate('Chat', {
        groupID: this.state.clubId,
        _id: userId,
        name: userFirstName}) 
  }
  render() {
    return(
      <SafeAreaView>
        <ScrollView>
          <View>
            <View style={styles.titleContainer}>
              <Title style={styles.title}>
                  Announcements
              </Title>
            </View>
            <View style={styles.titleContainer}>
              <Title style={styles.title}>
                Events
              </Title>
            </View>
            <Button style={styles.button} mode="outlined" onPress = {this.goToChat()} > Save </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
  
}

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: 'blue',
    height: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    margin: 16
  },
  title: {
    color: 'white',
    padding: 10,
    fontFamily: 'Helvetica',
    fontWeight: '500',
  },
  button: {
    marginTop: 10 
  },
})
export default clubAnnouncementPage;