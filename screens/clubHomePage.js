import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import CommonCompClubCard from '../components/CommonCompClubCard';
import { firebase }  from '../firebase';
import Search from '../components/CommonCompSearchBar';

class clubHomePage extends Component{
  constructor(props) {
    super(props);

    this.state = {
      clubs: []
    };
  }

  componentDidMount() {
    this.setState({clubs: []});
    const db = firebase.database().ref('/clubs');
    db.on('value', (snapshot) => {
      if (snapshot.exists()) {
        const clubArray = [];
        snapshot.forEach(function (childSnapshot) {
          clubArray.push(childSnapshot.toJSON());
        });
      this.setState({clubs: clubArray});
      }
    })
  };

  render(){
    return(
      <SafeAreaView>
        <ScrollView>
          <View>
          <Search/>
           <CommonCompClubCard clubName="Club Name" clubDesc="This is a club about friendship and trust here at Northwestern. To learn more"/>
           <View>
           {this.state.clubs.map(club => <CommonCompClubCard clubName={club.clubName} clubDesc={club.description}/>)}
           </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    ) 
  }
}
export default clubHomePage;