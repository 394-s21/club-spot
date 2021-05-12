import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

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
        const testEvents = [{ title: "clubName", description: "awesome event", isClub: true, latlng: { latitude: 42.055984, longitude: -87.675171 } }, { title: "2Club", description: "beach event", isClub: false, latlng: { latitude: 42.014, longitude: -87.675171 } }]
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

    eventInfo(marker){
        this.setState({dispEventInfo: true})
        this.setState({currentEvent: marker})
        console.log(this.state.currentEvent)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
            <View style={{height: 200, position: "absolute", elevation: 2, top: 50, left: 0, right: 0}}>
                <View style={{ backgroundColor: "white", width: "90%", marginLeft:"5%", height: 200, borderRadius: 10}}>
                    <Text>{this.state.dispEventInfo ? this.state.currentEvent.title : "test"}</Text>
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

                <Marker pinColor="blue" coordinate={{ latitude: this.state.currentLocation.coords.latitude, longitude: this.state.currentLocation.coords.longitude }} />
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
                <Marker coordinate={{ latitude: 42.014, longitude: -87.708 }} />
            </MapView>
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
});
export default eventMapPage;