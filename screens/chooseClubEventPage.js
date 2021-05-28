import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity, Text, ImageBackground} from 'react-native';
import CommonCompClubCard from '../components/CommonCompMyClubCard';
import { firebase }  from '../utils/firebase';
import 'firebase/database';

class chooseClubEventPage extends Component{
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
      <SafeAreaView style={styles.container}>
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
                navigation={this.props.navigation}
                isViewClub = {false}/>)}
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal:  15,
    height: '100%'
  },
})
export default chooseClubEventPage