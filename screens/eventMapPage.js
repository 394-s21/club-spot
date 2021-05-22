import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, Text, View, Dimensions, Button, TouchableOpacity } from 'react-native';
import { firebase }  from '../utils/firebase';
import 'firebase/database';


class eventMapPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initLocation: {latitude: 42.055984,longitude: -87.675171}, // always set the init location to Northwestern
            currentLocation: { "coordinate": { "latitude": 42.055984, "longitude": -87.708 } },
            events: [],
            dispEventInfo: false,
            zIndex: 0,
            currentEvent: {}
        }
    }

    componentDidMount() {
        this.setState({ events: [] })
        const db = firebase.database()
        // step 1: find the list of club IDs that I am part of
        var myClubIdDict = {}
        var myUserId = firebase.auth().currentUser ? firebase.auth().currentUser.uid : "testAdminId" // TODO: remove backdoor token later
        db.ref('/users/' + myUserId).on('value', (snapshot) => {
            if(snapshot.exists()){
                console.log("my club ",snapshot.val().clubs)
                myClubIdDict = snapshot.val().clubs
                // step 2: match the club ids
                db.ref('/events/').on('value', (snapshot) => {
                    const myEvents = []
                    if(snapshot.exists()) {
                        snapshot.forEach(function (childSnapshot) {
                            // only add if it is public or matches with the club id
                            let childSnap = childSnapshot.toJSON();
                            if (childSnap.isPublic || childSnap.clubId in myClubIdDict) {
                                console.log("club id is ",childSnap.clubId)
                                myEvents.push(childSnap)
                            }
                        })
                    }
                    this.setState({ events: myEvents })
                    console.log("my events ", myEvents)
                })
            }
        })
    }

    eventInfo(marker){
        this.setState({dispEventInfo: true})
        this.setState({currentEvent: marker})
        console.log(this.state.currentEvent)
    }

    closeInfo(){
        this.setState({dispEventInfo: false})
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => this.closeInfo()} style={styles(this.state.dispEventInfo).exitButton}><Text style={{color: "white"}}>X</Text></TouchableOpacity>
            <View style={styles(this.state.dispEventInfo).infoContainer}>
                <View style={styles(this.state.dispEventInfo).infoView}>
                    <Text style={styles(this.state.dispEventInfo).titleText} >{this.state.dispEventInfo ? this.state.currentEvent.title : ""}</Text>
                    <Text style={styles(this.state.dispEventInfo).addressText} >{this.state.dispEventInfo ? this.state.currentEvent.address : ""}</Text>
                    <Text style={styles(this.state.dispEventInfo).descriptText} >{this.state.dispEventInfo ? this.state.currentEvent.description : ""}</Text>
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

                <Marker 
                    image={require('../assets/currentMarker.png')} 
                    coordinate={{ 
                        latitude: this.state.currentLocation.coordinate.latitude, 
                        longitude: this.state.currentLocation.coordinate.longitude }} />
                    {this.state.events.map((curMarker, index) => (
                    <Marker
                        key={index}
                        coordinate={curMarker.coordinate}
                        title={curMarker.clubName}
                        description="Click for more info"
                        onCalloutPress={() => {this.eventInfo(curMarker)}}
                        pinColor={curMarker.isPublic ? "red" : "blue"}
                    />
                ))}
            </MapView>
            <View style={styles(this.state.dispEventInfo).buttonView}>
        </View>
            </View>
        );
    }
}

const styles = (dispEventInfo) => {
    var infoDisplayHeight = dispEventInfo ? 2: 0
    var closeInfoDisplayHeight = dispEventInfo ? 3: 0
    return (StyleSheet.create({
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
  titleText: {
    margin: 15, 
    marginBottom: 0, 
    fontSize: 25, 
    fontWeight: "bold"
  },
  addressText: {
    fontSize: 12, 
    marginLeft: 15
  },
  descriptText: {
    fontSize: 15, 
    margin: 15
  },
  exitButton: {
    height: 20,
    width: 20,
    borderRadius: 4,
    backgroundColor: "black",
    alignItems: "center",
    position: "absolute", 
    elevation: closeInfoDisplayHeight,
    zIndex: closeInfoDisplayHeight,
    top: "7%", 
    right: "9%"
},
  infoContainer: {
    height: 200,
    position: "absolute",
    elevation: infoDisplayHeight,
    zIndex: infoDisplayHeight,
    top: "5%",
    left: 0,
    right: 0
  },
  infoView: {
    backgroundColor: "white",
    width: "90%",
    marginLeft:"5%", 
    height: 200, 
    borderRadius: 10, 
    padding: 5
  }
}))
}

export default eventMapPage;
