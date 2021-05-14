import React, { Component } from 'react';
import { Button, View} from 'react-native';
import { firebase }  from '../utils/firebase';

class profilePage extends Component{
  constructor(props) {
    super(props);
  }

  logout = () => {
    firebase.auth().signOut()
    this.props.navigation.replace('loginPage');
  }

  render() {
    return (
      <View>
        <Button onPress = {this.logout}>
        logout
        </Button>
      </View>
      
    )
  }
}
export default profilePage;