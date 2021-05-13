import React, { Component } from 'react';
import { Provider, TextInput, RadioButton,Text, Subheading,Card, Button,Paragraph, Dialog, Portal } from 'react-native-paper';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding'; 
import { StyleSheet, View, SafeAreaView } from 'react-native';

class eventMapPage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      clubName: "",
      address: "",
      activity: "",
      date: "",
    }
  }

  translateAddress = () => {
    console.log(`hello`)
  }
  render(){
    return(
      // <TextInput label='Club Name' 
      //   value={this.state.clubName} 
      //   type="outlined"
        
      //   style={styles.field}
      //   onChangeText={text => this.setState({clubName:text})} />

      // <TextInput label='Activity' 
      //   value={this.state.activity} 
      //   type="outlined"
        
      //   style={styles.field}
      //   onChangeText={text => this.setState({activity:text})} />

      // <TextInput label='Date' 
      //   value={this.state.date} 
      //   type="outlined"
        
      //   style={styles.field}
      //   onChangeText={text => this.setState({date:text})} /> 
        <GooglePlacesAutocomplete
          placeholder='Address'
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          query={{
            key: 'AIzaSyBgcyM5Rx3Egi0ICUC_EF81gUWiKWr0Df4',
            language: 'en',
          }}
        />
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1'
  },
  field: {
    marginTop: 15,
    height: 55,
    width: 350,
    padding: 5,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 75,
    backgroundColor: '#3DD5F4',
    marginLeft: 15,
    marginRight: 15,
  },
})
export default eventMapPage;