import React, { Component, useState } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import CommonCompClubCard from '../components/CommonCompClubCard';
import { firebase }  from '../firebase';
import DropDownPicker from 'react-native-dropdown-picker';
import DropDown from "react-native-paper-dropdown";
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
      clubCat: "all",
      setCat: "all",
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
      clubCategories.push({label: "All", value: "All"})
      this.setState({clubs: clubArray, all_clubs: clubArray, clubDict: clubDict, clubCategories: clubCategories});
      }
    })
  };
  contains = (club,query) => {
    if (club.clubName.toLowerCase().includes(query) || club.category.toLowerCase().includes(query)) {
      console.log('club found')
      return true;
    }
    else {
      return false;
    }
  }


  filter(category) {
    this.setState({clubCat: category,
                  clubs: this.state.clubDict[category]})
    console.log(this.state)

  }


  handleSearch(queryText) {
    if (queryText === "") {
      this.setState({clubs: this.state.all_clubs})
    }
    else {
      console.log('query: ',queryText)
      const formattedQuery = queryText.toLowerCase();
      this.setState({query: formattedQuery})
      const all_clubs = this.state.clubs
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
      <SafeAreaView>
        <ScrollView>
          <View>
            <View style={styles.row}>
            <TextInput label="Search" 
                       value = {this.state.query} 
                       type = "flat" 
                       style = {styles.field}
                       placeholder = "Search for group"
                       onChangeText={queryText => this.handleSearch(queryText)} 
            />
              <DropDown
                label={'Select club category'}
                mode={'outlined'}
                value={this.state.clubCat}
                setValue={(item) => this.filter(item) }
                list={this.state.clubCategories}
                visible={this.state.showDropDown}
                showDropDown={() =>  this.setState({showDropDown: true})}
                onDismiss={() =>  this.setState({showDropDown: false})}
                inputProps={{
                right:  <TextInput.Icon  name={'menu-down'}  />,
                }}

                />
                
           </View>
           
           <CommonCompClubCard clubName="Club Name" clubDesc="This is a club about friendship and trust here at Northwestern. To learn more"/>
           <View>
           {this.state.clubs.map(club => <CommonCompClubCard clubName={club.clubName} clubDesc={club.description}/>)}
           </View>
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
    width: 200,
    margin: 12,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: "row"
  }
})



 /*
 dropdown 

 
 */
export default clubHomePage;


