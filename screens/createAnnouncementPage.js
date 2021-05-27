import { Component } from 'react';
import React from "react";
import { SafeAreaView, StyleSheet, View, ScrollView, Alert} from 'react-native';
import { Provider, TextInput, RadioButton,Text, Subheading,Card, Button,Paragraph, Dialog, Portal } from 'react-native-paper';
import { firebase }  from '../utils/firebase';

class createAnnouncementPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clubId : this.props.route.params.clubId,
      clubName : this.props.route.params.clubName,
      announcement : "",
    }
  }
  
  alertUser(title, subtitle) {
    Alert.alert(
      title,
      subtitle,
      [
          { text: "OK" }
      ]
    );
  }
  createAnnouncement = () => {
    let data = {
      clubId : this.state.clubId,
      clubName: this.state.clubName,
      announcement: this.state.announcement
    }
    console.log("data is ", data)
    const db = firebase.database().ref()
    db.child('/announcements/' + data.clubId).set(data)
    this.alertUser("Update Successful", "")
    this.props.navigation.pop() // go back to the club announcement page
  }
  render() {
    return(
      <View>
        <TextInput 
          label='What is your club announcement?' 
          value={this.state.announcement} 
          type="outlined"
          
          style={styles.field}
          onChangeText={text => this.setState({announcement:text})} />
        <Button style={styles.button} mode="outlined" onPress = {this.createAnnouncement} > Create Announcement </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  field: {
    marginTop: 15,
    height: 55,
    padding: 5,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 20
  },
})
export default createAnnouncementPage