import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView} from 'react-native';
import CommonCompClubCard from '../components/CommonCompClubCard';
import { firebase }  from '../utils/firebase';
import { Provider, TextInput, RadioButton,Text, Subheading,Card, Button,Paragraph, Dialog, Portal } from 'react-native-paper';
import filter from 'lodash.filter';

class clubHomePage extends Component{
  constructor(props) {
    super(props);

    this.state = {
      clubs: [],
      all_clubs: [],
      query: ""
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.contains = this.contains.bind(this);
    //console.log(this.props.navigation)
    //this.navigation = this.props.navigation.setOptions();
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
      this.setState({clubs: clubArray,
                    all_clubs: clubArray});
      }
    })
  };
  contains = (club,query) => {
    if (club.clubName.toLowerCase().includes(query) || club.category.toLowerCase().includes(query)) {
      //console.log('club found')
      return true;
    }
    else {
      //console.log('club not found')
      //console.log(club.clubName,query)
      return false;
    }
  }

  handleSearch(queryText) {
    //console.log('query: ',queryText)
    const formattedQuery = queryText.toLowerCase();
    this.setState({query: formattedQuery})
    console.log('query: ',queryText)
    if (queryText === "") {
      this.setState({clubs: this.state.all_clubs})
    }
    else {
      const all_clubs = this.state.all_clubs
      const filteredClubs = filter(all_clubs, club => {
        return this.contains(club,formattedQuery);
      })
      console.log('filtered clubs: ',filteredClubs)
      this.setState({clubs: filteredClubs})
    }
  }

  render(){
    return(
      <SafeAreaView>
        <View>
              <TextInput label="Search" 
                        value = {this.state.query} 
                        type="outlined" 
                        style = {styles.searchbar}
                        onChangeText={queryText => this.handleSearch(queryText)} />
        </View>
        <ScrollView>
           <View>
           {this.state.clubs.map(club => 
           <CommonCompClubCard 
              clubName={club.clubName} 
              key={club.clubName} 
              clubDesc={club.description} 
              clubCategory= {club.category} 
              clubEmail = {club.email} 
              navigation={this.props.navigation}/>)}
           </View>
        </ScrollView>
      </SafeAreaView>
    ) 
  }
}

const styles = StyleSheet.create({
  field: {
    height: 55,
    margin: 12,
    backgroundColor: 'white',
  },
  searchbar:{
    margin:10,
    backgroundColor: 'white',
  }
})

export default clubHomePage;