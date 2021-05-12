import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

class eventMapPage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      initLocation : {
        latitude: 42.055984,
        longitude: -87.675171,
      },
      currentLocation: {"coords": {"latitude": 42.055984, "longitude": -87.708}},
      events: []
    }
  }

  componentDidMount() {
    const testEvents = [{title: "clubName", description: "awesome event", latlng: {latitude: 42.055984, longitude: -87.675171}}, {title: "2Club", description: "beach event", latlng: {latitude: 42.014, longitude: -87.675171}}]
    this.setState({events: testEvents})
    this.getLocation()
  }

  async getLocation(){
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      this.setState({currentLocation: location});
  };

  render() {
    return (
        <MapView
            style={{ flex: 1 }}
            region={{
                latitude: this.state.initLocation.latitude,
                longitude: this.state.initLocation.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            }}>
        
          <Marker pinColor="blue" coordinate={{ latitude: this.state.currentLocation.coords.latitude, longitude: this.state.currentLocation.coords.longitude }} />
          {this.state.events.map((marker, index) => (
    <Marker
      key={index}
      coordinate={marker.latlng}
      title={marker.title}
      description={marker.description}
    />
  ))} 
          <Marker coordinate={{ latitude: 42.014, longitude: -87.708 }} /> 
        </MapView>
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