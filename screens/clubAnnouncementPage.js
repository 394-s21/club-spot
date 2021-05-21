import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {firebase} from '../utils/firebase';
import { StyleSheet, View, Text, Image, SafeAreaView, ScrollView, Alert } from 'react-native';

class clubAnnouncementPage extends Component{
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
      <SafeAreaView>
        <ScrollView>
          <View>
            <View>
              <Text>Announcements</Text>
            </View>
            <View>
              <Text>Events</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
  
}
export default clubAnnouncementPage;