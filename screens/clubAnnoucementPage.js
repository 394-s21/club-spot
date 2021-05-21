import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {firebase} from '../utils/firebase';
class clubAnnoucementPage extends Component{
  constructor(props){
      super(props);
      this.state = {
        clubName : this.props.route.params.clubName,
        clubDesc : this.props.route.params.clubDesc,
        clubCategory: this.props.route.params.clubCategory,
        clubEmail: this.props.route.params.clubEmail,
        clubId: this.props.route.params.clubId,
        userInfo: {},
        clubmember: false,
        userId: firebase.auth().currentUser ? firebase.auth().currentUser.uid : "testAdminId" //backdoor token (remove in production)
    }
  }
  render() {
    return(
      <View>
        <Text>Club Annoucement here!</Text>
      </View>
    )
  }
  
}
export default clubAnnoucementPage;