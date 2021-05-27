import React, { Component } from 'react';
import { Provider, TextInput, RadioButton,Text, Subheading,Card, Button,Paragraph, Dialog, Portal } from 'react-native-paper';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Location from 'expo-location';
import { firebase }  from '../utils/firebase';

//TODO: add verification to make sure all fields are filled.
//TODO: revamp this page while retaining backend functionality.
class eventMapPage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      clubName: this.props.route.params.clubName,
      clubId: this.props.route.params.clubId,
      latitude: 0,
      longitude: 0,
      eventName: "",
      address: "",
      description: "",
      date: null,
      time: null,
      datePickerVisibility: false,
      mode: "date",
      isPublic: true
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
    let toggle = !this.state.isPublic;
    this.setState({isPublic: toggle})
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
    const coordinate = await Location.geocodeAsync(this.state.address)
    let event = {
      title: this.state.eventName, 
      description: this.state.description, 
      address: this.state.address, 
      isPublic: this.state.isPublic, 
      date: "" + this.state.date, 
      time: "" + this.state.time, 
      coordinate: { latitude: coordinate[0].latitude, longitude: coordinate[0].longitude },
      clubName: this.state.clubName,
      clubId: this.state.clubId,
    }
    console.log(event)
    
    const db = firebase.database().ref();
    db.child('/events/'+event.title).set(event)
  }

  getDateString () {
    var dateObj = this.state.date
    var month = dateObj.getMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    return (month + "/" + day + "/" + year)
  }

  getTimeString () {
    var timeObj = this.state.time
    var hour = timeObj.getHours();
    var minute = timeObj.getMinutes();
    var half = " AM"
    if (hour > 12){
        hour =  hour - 12
        half = " PM"
    }
    return (hour + ":" + minute + half)
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={{ flexDirection: "row", width: "100%" }}>       
          <TextInput label='Event Name'
            value={this.state.eventName}
            type="outlined"
            style={styles.field}
            onChangeText={text => this.setState({ eventName: text })} />
          <TouchableOpacity style={styles.toggleButton} onPress={() => this.toggleType()} >
              <Text style={styles.OBtext}>{this.state.isPublic ? "PUBLIC" : "MEMBER"}</Text>
              <Text style={styles.OBtext}>EVENT</Text>
          </TouchableOpacity>
        </View>
        <View style={{height: 80}}/>
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
            minuteInterval={5}
            minimumDate={new Date()}
            onConfirm={(x) => this.handleConfirm(x)}
            onCancel={(x) => this.hideDatePicker(x)}
            />
            {this.state.date && this.state.time ?
                <View style={{ width: "95%", backgroundColor: "white", padding: 10, borderRadius: 10, margin: 20 }}>
                    <Text style={styles.OBtext}>{"Date: " + this.getDateString()}</Text>
                    <Text style={styles.OBtext}>{"Time: " + this.getTimeString()}</Text>
                </View> : this.state.date ?
                    <View style={{ width: "95%", backgroundColor: "white", padding: 10, borderRadius: 10, margin: 20 }}>
                        <Text style={styles.OBtext}>{"Date: " + this.getDateString()}</Text>
                    </View> : this.state.time ?
                        <View style={{ width: "95%", backgroundColor: "white", padding: 10, borderRadius: 10, margin: 20 }}>
                            <Text style={styles.OBtext}>{"Time: " + this.getTimeString()}</Text>
                        </View>
                        : <View />}
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
            <View style={{ width: "95%", height: 300, margin: 20, position: "absolute", top: 100 }}>
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
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    height: "100%", 
    width: "100%", 
    backgroundColor: "#ecf0f1", 
    alignItems: "center", 
    padding: 20
  },
  field: {
    marginTop: 15,
    height: 55,
    marginLeft: 5,
    width: 265,
    padding: 5, 
    backgroundColor: 'white',
  },
  toggleButton: {
    height: 65, 
    width: 100, 
    // backgroundColor: this.state.isPublic ? "lightblue": "#cec1e7", 
    backgroundColor: "lightblue",
    margin: 15, 
    marginRight: 5,
    marginBottom: 0, 
    borderRadius: 10, 
    justifyContent: "center", 
    alignItems: "center",
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
