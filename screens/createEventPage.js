import React, { Component } from 'react';
import { Provider, TextInput, RadioButton,Text, Subheading,Card, Button,Paragraph, Dialog, Portal } from 'react-native-paper';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding'; 
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePickerModal from "react-native-modal-datetime-picker";

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
      datePickerVisibility: false
    }
  }

  translateAddress = () => {
    console.log(`hello`)
  }

  showDatePicker = () => {
      this.setState({datePickerVisibility: true})
  };

  hideDatePicker = () => {
    this.setState({datePickerVisibility: false})
  };

  handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    this.hideDatePicker();
  };

  render(){
    return(

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
    <View style={styles.container}>
        <View style={{height: "100%", width: "100%", backgroundColor: "grey"}}>
        <TextInput label='Club Name' 
         value={this.state.clubName} 
         type="outlined"
        
         style={styles.field}
         onChangeText={text => this.setState({clubName:text})} />
      <View style={{flexDirection: "row"}}>
         <TouchableOpacity style={{width: 100, height: 30, backgroundColor: "red"}} onPress={() => this.showDatePicker()} title="Date" />
         <TouchableOpacity style={{width: 100, height: 30, backgroundColor: "green"}} onPress={() => this.showTimepicker} title="Time" />
      </View>
      <DateTimePickerModal
        isVisible={this.state.datePickerVisibility}
        mode="date"
        onConfirm={(x) => this.handleConfirm(x)}
        onCancel={(x) => this.hideDatePicker(x)}
      />
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
        </View>
    </View>
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