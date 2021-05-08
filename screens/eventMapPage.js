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
      }
    }
  }

  render() {
    //TODO: to be replaced with real coordinate
    return (
        <MapView
            style={{ flex: 1 }}
            region={{
                latitude: this.state.initLocation.latitude,
                longitude: this.state.initLocation.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            }}>
          <Marker coordinate={{ latitude: 42.055984, longitude: -87.675171 }} />
          <Marker coordinate={{ latitude: 42.014, longitude: -87.675171 }} /> 
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