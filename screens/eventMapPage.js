import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, Text, View, Dimensions, Button, TouchableOpacity } from 'react-native';


class eventMapPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initLocation: {
                latitude: 42.055984,
                longitude: -87.675171,
            },
            currentLocation: { "coords": { "latitude": 42.055984, "longitude": -87.708 } },
            events: [],
            dispEventInfo: false,
            currentEvent: {}
        }
    }

    componentDidMount() {
        //TODO get data from firebase
        const testEvents = [{ title: "Social fun", description: "pick up basketball", address: "12345 Sheridan Rd, Evanston, IL", isClub: false, latlng: { latitude: 42.055984, longitude: -87.675171 } }, { title: "Chess Club", description: "chess tourney", address: "12345 Sheridan Rd, Evanston, IL", isClub: true, latlng: { latitude: 42.014, longitude: -87.675171 } }]
        
        this.setState({ events: testEvents })
        this.getLocation()
    }

    async getLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ currentLocation: location });
    };


  navigateToCreateEvent = () => {this.props.navigation.navigate('Create Event')}
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
            style={{ flex: 1 }}
            region={{
                latitude: this.state.initLocation.latitude,
                longitude: this.state.initLocation.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            }}>
        
          <Marker image={require('../assets/currentMarker.png')} coordinate={{ latitude: this.state.currentLocation.coords.latitude, longitude: this.state.currentLocation.coords.longitude }} />
          <Marker coordinate={{ latitude: 42.055984, longitude: -87.675171 }} />
          <Marker coordinate={{ latitude: 42.014, longitude: -87.675171 }} /> 
          <Marker coordinate={{ latitude: 42.014, longitude: -87.708 }} /> 
        </MapView>
        <View style={styles.buttonView}>
    eventInfo(marker){
        this.setState({dispEventInfo: true})
        this.setState({currentEvent: marker})
        console.log(this.state.currentEvent)
    }

    closeInfo(){
        this.setState({dispEventInfo: false})
    }

    navigateToCreateEvent = () => {this.props.navigation.navigate('Create Event')}
    //TODO decide what to display on event info popup
    render() {
        return (
            <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => this.closeInfo()} style={{height: 20, width: 20, borderRadius: 4, backgroundColor: "black", alignItems: "center", position: "absolute", elevation: (this.state.dispEventInfo ? 3: 0),  zIndex: (this.state.dispEventInfo ? 1: 0), top: "7%", right: "9%"}}><Text style={{color: "white"}}>X</Text></TouchableOpacity>
            <View style={{height: 200, position: "absolute", elevation: (this.state.dispEventInfo ? 2: 0), top: "5%", left: 0, right: 0}}>
                <View style={{ backgroundColor: "white", width: "90%", marginLeft:"5%", height: 200, borderRadius: 10, padding: 5}}>
                    <Text style={{margin: 15, marginBottom: 0, fontSize: 25, fontWeight: "bold"}} >{this.state.dispEventInfo ? this.state.currentEvent.title : ""}</Text>
                    <Text style={{fontSize: 12, marginLeft: 15}} >{this.state.dispEventInfo ? this.state.currentEvent.address : ""}</Text>
                    <Text style={{margin: 15,fontSize: 15}} >{this.state.dispEventInfo ? this.state.currentEvent.description : ""}</Text>
                </View>
            </View>
            <MapView
                style={{ flex: 1 }}
                region={{
                    latitude: this.state.initLocation.latitude,
                    longitude: this.state.initLocation.longitude,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}>

                <Marker image={require('../assets/currentMarker.png')} coordinate={{ latitude: this.state.currentLocation.coords.latitude, longitude: this.state.currentLocation.coords.longitude }} />
          {this.state.events.map((curMarker, index) => (
                    <Marker
                        key={index}
                        coordinate={curMarker.latlng}
                        title={curMarker.title}
                        description={curMarker.description}
                        onCalloutPress={() => {this.eventInfo(curMarker)}}
                        pinColor={curMarker.isClub ? "red" : "blue"}
                    />
                ))}
            </MapView>
             <View style={styles.buttonView}>
          <TouchableOpacity onPress = {this.navigateToCreateEvent}>
            <AntDesign name="pluscircleo" size={36} color="black" />
          </TouchableOpacity>
        </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    buttonView: {
    position: 'absolute',//use absolute position to show button on top of the map
    top: '90%', //for center align
    right: '5%', // for right align
    alignSelf: 'flex-end' //for align to right
  },
});
export default eventMapPage;