import React, { Component } from 'react';
import { Provider, TextInput, RadioButton,Text, Subheading,Card, Button,Paragraph, Dialog, Portal } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { StyleSheet, View } from 'react-native';

class eventMapPage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      groupName: "",
    }
  }
  render(){
    return(
      <View>
        <TextInput label='Club Name' 
          value={this.state.groupName} 
          type="outlined"
          
          style={styles.field}
          onChangeText={text => this.setState({groupName:text})} />

        <TextInput label='Address' 
          value={this.state.groupName} 
          type="outlined"
          
          style={styles.field}
          onChangeText={text => this.setState({groupName:text})} />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  field: {
    marginTop: 15,
    height: 55,
    width: 500,
    padding: 5,
    backgroundColor: 'white',
  },
})
export default eventMapPage;