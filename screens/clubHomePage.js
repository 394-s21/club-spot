import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import CommonCompClubCard from '../components/CommonCompClubCard';

class clubHomePage extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <View>
        <CommonCompClubCard/>
      </View>
    ) 
  }
}
export default clubHomePage;