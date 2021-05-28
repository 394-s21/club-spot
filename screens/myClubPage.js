import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity, Text, ImageBackground} from 'react-native';
import CommonCompClubCard from '../components/CommonCompMyClubCard';
import { firebase }  from '../utils/firebase';
import 'firebase/database';
import CommonCompEventCard from '../components/CommonCompEventCard';

class myHomePage extends Component{
  constructor(props){
    super(props)
    this.state = {
      clubs: [],
      events: []
    }
  }


  componentDidMount() {
    this.setState({clubs: []})
    const db = firebase.database()
    // step 1: find the list of club IDs that I am part of 
    var myClubIdDict = {}
    // TODO: remove backdoor token later
    var myUserId = firebase.auth().currentUser ? firebase.auth().currentUser.uid : "testAdminId"
    
    db.ref('/users/' + myUserId).on('value', (snapshot) => {
      if(snapshot.exists()){
        console.log(`my club dict is ${snapshot.val().clubs}`)
        myClubIdDict = snapshot.val().clubs
        // step 2: find my club from the club database
        db.ref('/clubs').on('value', (snapshot) => {
          if(snapshot.exists()){
            const clubArray = [];
            snapshot.forEach(function (childSnapshot) {
              if(childSnapshot.val().id in myClubIdDict){
                console.log(`I am in clubID ${childSnapshot.val().id}`)
                let childSnap = childSnapshot.toJSON()
                clubArray.push(childSnap)
              }
            })
            this.setState({clubs: clubArray})
            db.ref('/events').on('value', (snapshot) => {
                if(snapshot.exists()){
                  const eventArray = [];
                  snapshot.forEach(function (childSnapshot) {
                    if(childSnapshot.val().clubId in myClubIdDict){
                      console.log(`This event is hosted by this club ID ${childSnapshot.val().clubId}`)
                      let childSnap = childSnapshot.toJSON()
                      eventArray.push(childSnap)
                    }
                  })
                  this.setState({events: eventArray})
                }
              })
          }
        })
      }
    })
  }

  render() {
    return(
      // <ImageBackground style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('../assets/gradient.png')}>
      <SafeAreaView style={styles.container}>
          <View style={{height: "45%", width: "100%"}}>
          <ScrollView>
          <View>
          {this.state.clubs.map(club => 
          <CommonCompClubCard 
              clubName={club.clubName} 
              key={club.clubName} 
              clubDesc={club.description} 
              clubCategory= {club.category} 
              clubEmail = {club.email} 
              clubId = {club.id}
              navigation={this.props.navigation}/>)}
          </View>
        </ScrollView>
        </View> 
        <View style={{height: "10%", width: "100%", alignItems: "center", justifyContent: "center"}}>
            <Text style= {{fontSize: 25, fontWeight: "bold"}}>My Events</Text>
        </View>    
        <View style={{height: "45%", width: "100%", backgroundColor: "#4169E1"}}>
        <ScrollView>
          <View>
          {this.state.events.map(event => 
          <CommonCompEventCard 
              title={event.title} 
              key={event.title} 
              description={event.description} 
              address= {event.address} 
              date = {event.date} 
              time = {event.time}/>)}
          </View>
        </ScrollView>
        </View>    
      </SafeAreaView>
      // </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    //flex:  1,
    marginHorizontal:  15,
    justifyContent:  'center',
  },
})
export default myHomePage