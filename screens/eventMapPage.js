import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, Text, View, Dimensions, Button, TouchableOpacity } from 'react-native';

class eventMapPage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      initLocation : {
        latitude: 42.055984,
        longitude: -87.675171,
      },
      currentLocation: {"coords": {"latitude": 42.055984, "longitude": -87.708}}
    }
  }

  componentDidMount() {
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
        
          <Marker pinColor="blue" coordinate={{ latitude: this.state.currentLocation.coords.latitude, longitude: this.state.currentLocation.coords.longitude }} />
          <Marker coordinate={{ latitude: 42.055984, longitude: -87.675171 }} />
          <Marker coordinate={{ latitude: 42.014, longitude: -87.675171 }} /> 
          <Marker coordinate={{ latitude: 42.014, longitude: -87.708 }} /> 
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
  buttonView: {
    position: 'absolute',//use absolute position to show button on top of the map
    top: '90%', //for center align
    right: '5%', // for right align
    alignSelf: 'flex-end' //for align to right
  },
});
export default eventMapPage;