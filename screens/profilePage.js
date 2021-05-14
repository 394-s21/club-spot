import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {Button} from 'react-native-paper';
import { firebase }  from '../utils/firebase';

class profilePage extends Component{
  // TODO: add more user info later once the design has finalized
  constructor(props) {
    super(props);
  }

  logout = () => {
    firebase.auth().signOut()
    this.props.navigation.replace('loginPage');
  }

  render() {
    return (
      <View style={styles.row}>
        <Button mode="contained" dark="true" style={styles.logoutButton} onPress={this.logout}>logout </Button>
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  row: {
    marginLeft: 8,
    marginRight: 8,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    backgroundColor: '#000000',
    marginTop: 26,
    width: "30%",
    marginLeft: 5,
    marginRight: 5
  },
})
export default profilePage;