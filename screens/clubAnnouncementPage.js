import React, { Component } from 'react';
import {firebase} from '../utils/firebase';
import { StyleSheet, View, Text, Image, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Button, Title, Card } from 'react-native-paper';
import CommonCompEventCard from '../components/CommonCompEventCard';

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
        userId: firebase.auth().currentUser ? firebase.auth().currentUser.uid : "testAdminId", //backdoor token (remove in production)
        announcement: null,
        events: []
    }
  }

  createAnnouncement = () => {
    this.props.navigation.navigate('Create Announcement', 
      {clubName: this.state.clubName, clubId: this.state.clubId})
  }
  createEvent = () => {
    this.props.navigation.navigate('Create Event', 
      {clubName: this.state.clubName, clubId: this.state.clubId})
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

  componentDidMount() {
    const clubId = this.state.clubId
    this.setState({announcement: null})
    firebase.database().ref('/announcements/' + this.state.clubId).on('value', (snapshot) => {
      var updateAnnoucement = ""
      if(snapshot.exists()) {
        var updateAnnoucement = snapshot.toJSON().announcement
      }
      console.log("my announcement ",updateAnnoucement)
      this.setState({announcement: updateAnnoucement})
    })
    firebase.database().ref('/events').on('value', (snapshot) => {
        if(snapshot.exists()){
          const eventArray = [];
          snapshot.forEach(function (childSnapshot) {
            if(childSnapshot.val().clubId == clubId){
              console.log(`This event is hosted by this club ID ${childSnapshot.val().clubId}`)
              let childSnap = childSnapshot.toJSON()
              eventArray.push(childSnap)
            }
          })
          console.log("EVENT ARRAY" + eventArray)
          this.setState({events: eventArray})
        }
      })
  }
  render() {
    const announcement = !this.state.announcement || this.state.announcement === "" ? "Your club currently does not have any announcements!" : this.state.announcement
    const events = this.state.events
    return(
        <View style={{height: "200%", width: "100%"}}>
                <View>
                    <View style={styles.titleContainer}>
                        <Title style={styles.title}>
                            Announcements
                        </Title>
                    </View>
                    <View style={styles.container}>
                        <Card
                            style={styles.card}>
                            <Card.Title
                                subtitle={announcement}
                                subtitleStyle={styles.clubAnnouncement}
                                subtitleNumberOfLines={2}
                            />
                        </Card>
                    </View>
                    <View style={styles.titleContainer}>
                        <Title style={styles.title}>
                            Events
                        </Title>
                    </View>
                    <View style={{ height: "30%", width: "100%", backgroundColor: "#4169E1", borderRadius: 6 }}>
                        <ScrollView>
                            <View>
                                {events.map(event =>
                                    <CommonCompEventCard
                                        title={event.title}
                                        key={event.title}
                                        description={event.description}
                                        address={event.address}
                                        date={event.date}
                                        time={event.time} />)}
                            </View>
                        </ScrollView>
                    </View>
                    <View style={styles.row}>
                        <Button mode="contained" dark="true" style={styles.button} onPress={this.createAnnouncement} > Create Announcement </Button>
                    </View>
                    <View style={styles.row}>
                        <Button mode="contained" dark="true" style={styles.button} onPress={this.createEvent} > Create Event </Button>
                    </View>
                    <View style={styles.row}>
                        <Button mode="contained" dark="true" style={styles.button} onPress={this.goToChat} > Go To Group Chat </Button>
                    </View>
                </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: '#4169E1',
    height: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    margin: 16,
    borderRadius: 5
  },
  title: {
    color: 'white',
    padding: 10,
    fontFamily: 'Helvetica',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#000000',
    marginTop: 10,
    width: "65%",
    marginLeft: 5,
    marginRight: 5,
  },
  row: {
    marginLeft: 8,
    marginRight: 8,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    height: 100,
    width: "90%"
    
  },
  clubAnnouncement: {
    fontSize: 18,
    paddingTop: 10,
    fontWeight: "bold",
    color: "black"
  },
  container: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    margin: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 40
  },
  buttonContainer: {
    marginLeft: 8,
    marginRight: 8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
export default clubAnnouncementPage;