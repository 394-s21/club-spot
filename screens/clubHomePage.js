import React, { Component, useState } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import CommonCompClubCard from '../components/CommonCompClubCard';
import DropDown from "react-native-paper-dropdown";
import { firebase }  from '../utils/firebase';
import 'firebase/database';
import { Provider, TextInput, RadioButton,Text, Subheading,Card, Button,Paragraph, Dialog, Portal } from 'react-native-paper';
import filter from 'lodash.filter';

class clubHomePage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      clubs: [],
      all_clubs: [],
      clubCategories: [{label: "ya", value: "ya"}],
      clubDict: {},
      query: "",
      showDropDown: false,
      clubCat: "All",
      dropDownOpen: false
    };
    this.handleSearch = this.handleSearch.bind(this)
    this.contains = this.contains.bind(this)
    this.filter = this.filter.bind(this)
  }

  componentDidMount() {
    this.setState({clubs: []});
    const db = firebase.database().ref('/clubs');
    db.on('value', (snapshot) => {
      if (snapshot.exists()) {
        const clubArray = [];
        const clubCategories = [];
        let clubDict = {};
        snapshot.forEach(function (childSnapshot) {
          let childSnap = childSnapshot.toJSON();
          clubArray.push(childSnap);
          if (!(childSnap.category in clubDict)) {
            clubDict[childSnap.category] = [childSnap];
            clubCategories.push({label: childSnap.category, value: childSnap.category});
          } else {
            clubDict[childSnap.category].push(childSnap);
          }
        });
      clubDict['All'] = clubArray
      clubCategories.unshift({label: "All", value: "All"})
      this.setState({clubs: clubArray, all_clubs: clubArray, clubDict: clubDict, clubCategories: clubCategories});
      }
    })
  };
  contains = (club,query) => {
    if (club.clubName.toLowerCase().includes(query) || club.category.toLowerCase().includes(query)) {
      return true;
    }
    else {
      return false;
    }
  }


  filter(category) {
    this.setState({clubCat: category,
                  clubs: filter(this.state.clubDict[category], club => {
                    return this.contains(club, this.state.query);}) }, function () {
                      console.log(this.state.clubs);
                      console.log(this.state.query)});
  }


  handleSearch(queryText) {
    const formattedQuery = queryText.toLowerCase();
    this.setState({query: formattedQuery})
    console.log('query: ',queryText)
    if (queryText === "") {
      this.setState({clubs: this.state.clubDict[this.state.clubCat]})
    }
    else {
      const all_clubs = this.state.clubDict[this.state.clubCat]
      const filteredClubs = filter(all_clubs, club => {
        return this.contains(club,formattedQuery);
      })
      console.log('filtered clubs: ',filteredClubs)
      console.log(this.state.clubDict)
      this.setState({clubs: filteredClubs})
    }
  }

  render(){
    return(
      <Provider > 
      <SafeAreaView style={styles.container}>
        <View style={styles.dropdown}>
          <DropDown
            label={'Filter category'}
            placeholder="Category"
            mode={'outlined'}
            value={this.state.clubCat}
            setValue={(item) => this.filter(item) }
            list={this.state.clubCategories}
            visible={this.state.showDropDown}
            showDropDown={() =>  this.setState({showDropDown: true})}
            onDismiss={() =>  this.setState({showDropDown: false})}
            inputProps={{
            right:  <TextInput.Icon  name={'menu-down'}/>,
            }}
            dropDownContainerMaxHeight={500}
            /> 
        </View>
        <View>
          <TextInput label="Search" 
                    value = {this.state.query} 
                    type = "flat" 
                    style = {styles.searchbar}
                    placeholder = "Search for group"
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
              clubId = {club.id}
              navigation={this.props.navigation}/>)}
          </View>
        </ScrollView>
      </SafeAreaView>
      </Provider>
    ) 
  }
}

const styles = StyleSheet.create({
  field: {
    height: 55,
    //width: 400,
    margin: 12,
    backgroundColor: 'white',
  },
  row: {
    marginTop: 10,
    flexDirection: "row"
  },
  container: {
    //flex:  1,
    marginHorizontal:  15,
    justifyContent:  'center',
  },

  searchbar:{
    //width:200,
    height:70,
    marginTop:10,
    margin:0,
    backgroundColor: 'white',
  },
  dropdown:{
    //flexDirection:'row',
    //height:255,
    //marginBottom:5,
    backgroundColor:'white'

  }
})
export default clubHomePage;
