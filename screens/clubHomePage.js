import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView} from 'react-native';
import CommonCompClubCard from '../components/CommonCompClubCard';
import { firebase }  from '../firebase';
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
    this.handleSearch = this.handleSearch.bind(this)
    this.contains = this.contains.bind(this)
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
      console.log('club found')
      return true;
    }
    else {
      return false;
    }
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
      this.setState({clubs: filteredClubs})
    }
  }
  

  render(){
    return(
      <SafeAreaView>
        <ScrollView>
          <View>
<<<<<<< Updated upstream
              <TextInput label="Search" 
                        value = {this.state.query} 
                        type="outlined" 
                        style = {styles.field}
                        onChangeText={queryText => this.handleSearch(queryText)} />
           <CommonCompClubCard clubName="Club Name" clubDesc="This is a club about friendship and trust here at Northwestern. To learn more"/>
=======
            <View>
            
            <TextInput label="Search"
                       value = {this.state.query} 
                       type = "flat" 
                       style = {styles.field}
                       placeholder = "Search for group"
                       onChangeText={queryText => this.handleSearch(queryText)} 
            />
            <DropDown
                style={styles.dropdown}
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
                right:  <TextInput.Icon  name={'menu-down'}  />,
                }}
                />
                
           </View>
>>>>>>> Stashed changes
           <View>
           {this.state.clubs.map(club => <CommonCompClubCard clubName={club.clubName} clubDesc={club.description}/>)}
           </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    ) 
  }
}

const styles = StyleSheet.create({
  dropdown: {
    padding: 20
  },
  field: {
    height: 55,
<<<<<<< Updated upstream
=======
    flex: 1,
>>>>>>> Stashed changes
    margin: 12,
    backgroundColor: 'white'
  },
<<<<<<< Updated upstream
=======
  row: {
    margin: 4,
    flexDirection: "row"
  },
  container: {

    flex:  1,
      
    marginHorizontal:  20,
      
    justifyContent:  'center',
      
  },

  searchbar:{
    margin:10,
    backgroundColor: 'white',
  }
>>>>>>> Stashed changes
})

export default clubHomePage;