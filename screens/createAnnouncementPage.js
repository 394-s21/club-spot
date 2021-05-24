import { Component } from 'react';
import React from "react";
import { SafeAreaView, StyleSheet, View, ScrollView} from 'react-native';
import { Provider, TextInput, RadioButton,Text, Subheading,Card, Button,Paragraph, Dialog, Portal } from 'react-native-paper';
import { firebase }  from '../utils/firebase';

class createAnnouncementPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clubId : this.props.route.params.clubId,
      clubName : this.props.route.params.clubName,
      clubDesc : this.props.route.params.clubDesc,
      clubCategory: this.props.route.params.clubCategory,
      clubEmail: this.props.route.params.clubEmail,
      announcement : "",
    }
  }
  
  createAnnouncement = () => {
    let data = {
      clubId : this.state.clubId,
      clubName: this.state.clubName,
      announcement: this.state.announcement,
    }
    console.log("data is ", data)
    const db = firebase.database().ref()
    db.child('/announcements/' + data.clubId).set(data)
    this.props.navigation.navigate('Club Announcement', {clubName: this.state.clubName, clubDesc: this.state.clubDesc, clubCategory: this.state.clubCategory, clubEmail: this.state.clubEmail, clubId: this.state.clubId})
    
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
        <View  style={{alignItems: "center"}}>
        <Button labelStyle={{color: "white"}} style={styles.button} mode="outlined" onPress = {this.createAnnouncement} > Create Announcement </Button>
        </View>
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
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: '#000000',
    marginTop: 26,
    width: "70%",
    marginLeft: 5,
    marginRight: 5,
  },
})
export default createAnnouncementPage