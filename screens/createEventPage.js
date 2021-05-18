import React, { Component } from 'react';
import { Provider, TextInput, RadioButton,Text, Subheading,Card, Button,Paragraph, Dialog, Portal } from 'react-native-paper';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Location from 'expo-location';
import { firebase }  from '../utils/firebase';

class eventMapPage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      clubName: "",
      address: "",
      description: "",
      date: "",
      time: "",
      datePickerVisibility: false,
      mode: "date",
      isClub: true
    }
  }

  showDatePicker = () => {
      this.setState({datePickerVisibility: true})
      this.setState({mode: "date"})
  };

  showTimePicker = () => {
    this.setState({datePickerVisibility: true})
    this.setState({mode: "time"})
};

  hideDatePicker = () => {
    this.setState({datePickerVisibility: false})
  };

  toggleType = () => {
    let toggle = !this.state.isClub;
    this.setState({isClub: toggle})
  };

  handleConfirm = (dateTime) => {
    if(this.state.mode == "date"){
        this.setState({date: dateTime})
    } else {
        this.setState({time: dateTime})
    }
    this.hideDatePicker();
  };

  async handleCreate (){
      const coords = await Location.geocodeAsync(this.state.address)
      let event = {title: this.state.clubName, description: this.state.description, address: this.state.address, isCLub: this.state.isClub, date: this.state.date, time: this.state.time, coords: { latitude: coords[0].latitude, longitude: coords[0].longitude }}
      console.log(event)
      const db = firebase.database().ref();
      db.child('/events/'+event.title).set(event).then(
            this.props.navigation.navigate('Event Map')
          )
  }

  render(){
    return(
        <View style={styles.container}>
            <View style={{ height: "100%", width: "100%", backgroundColor: "grey", alignItems: "center", padding: 20}}>
            <View style={{ flexDirection: "row", width: "100%" }}>       
                <TextInput label='Event Name'
                    value={this.state.clubName}
                    type="outlined"
                    style={styles.field}
                    onChangeText={text => this.setState({ clubName: text })} />
                    <TouchableOpacity style={{height: 65, width: 100, backgroundColor: this.state.isClub ? "lightblue": "#cec1e7", margin: 15, marginBottom: 0, borderRadius: 10, justifyContent: "center", alignItems: "center"}} onPress={() => this.toggleType()} >
                        <Text style={styles.OBtext}>{this.state.isClub ? "CLUB" : "SOCIAL"}</Text>
                        <Text style={styles.OBtext}>EVENT</Text>
                    </TouchableOpacity>
                </View>
                <TextInput label='Description'
                    value={this.state.description}
                    multiline={true}
                    numberOfLines={2}
                    type="outlined"
                    style={styles.multifield}
                    onChangeText={text => this.setState({ description: text })} />
                <DateTimePickerModal
                    isVisible={this.state.datePickerVisibility}
                    mode={this.state.mode}
                    minimumDate={new Date(2021,5,16)}
                    minuteInterval={5}
                    onConfirm={(x) => this.handleConfirm(x)}
                    onCancel={(x) => this.hideDatePicker(x)}
                />
                <View style={{ width: "90%", height: 300, margin: 20 }}>
                    <GooglePlacesAutocomplete
                        placeholder='Address'
                        onPress={(data, details = null) => {
                            // 'details' is provided when fetchDetails = true
                            this.setState({ address: data.description })
                            console.log(data, details); 
                        }}
                        query={{
                            key: 'AIzaSyBgcyM5Rx3Egi0ICUC_EF81gUWiKWr0Df4',
                            language: 'en',
                        }}
                    />
                </View>
                <View style={{ flexDirection: "row", padding: 25, width: "100%" }}>
                    <TouchableOpacity style={styles.OptionButton} onPress={() => this.showDatePicker()} >
                        <Text style={styles.OBtext}>DATE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.OptionButton} onPress={() => this.showTimePicker()} >
                        <Text style={styles.OBtext}>TIME</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ height: 50, width: 200, backgroundColor: "lightblue", borderRadius: 10, justifyContent: "center" }} onPress={() => this.handleCreate()}>
                    <Text style={{alignSelf: "center", fontWeight: "bold", fontSize: 25}}>Create Event</Text>
                </TouchableOpacity>
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
    backgroundColor: '#ecf0f1',
    width: "100%"
  },
  field: {
    marginTop: 15,
    height: 55,
    width: 250,
    padding: 5,
    backgroundColor: 'white',
  },
  multifield: {
    marginTop: 15,
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
  OptionButton: {
     width: 150, 
     height: 50, 
     backgroundColor: "lightblue", 
     margin: 8, 
     borderRadius: 10, 
     justifyContent:"center",
     alignItems: "center" 
  },
  OBtext: {
      fontSize: 20,
      fontWeight: "bold"
  }
})
export default eventMapPage;
