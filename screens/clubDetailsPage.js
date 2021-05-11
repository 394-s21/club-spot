import React, { Component } from 'react';
import clubHomePage from './clubHomePage';
import { StyleSheet, View, Text, Image, SafeAreaView, ScrollView } from 'react-native';



class clubDetailsPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            clubName : this.props.route.params.clubName,
            clubDesc : this.props.route.params.clubDesc
        }
    }


    render(){
        return(
            <SafeAreaView>
                <ScrollView>
                    <Text style = {styles.title}>{this.state.clubName}
                    {'\n'}
                    </Text>
                    <Text style = {styles.clubDescription}>{this.state.clubDesc}</Text>
                </ScrollView>
            </SafeAreaView>
        )
    }

}

const styles = StyleSheet.create({
    title: {
      fontSize: 22,
      paddingTop: 10
    },
    container: {
      flex: 1,
      padding: 10,
      borderRadius: 40
    },
    clubImage: {
      borderRadius: 25,
      borderWidth: 2,
      width: 50,
      height: 50,
      marginTop: 15,
      alignContent: 'center',
      justifyContent: 'center'
    },
    imageContainer: {
      paddingHorizontal: 0,
      //borderWidth: 2,
      width: 60
    },
    clubDescription: {
      fontSize: 14,
      
    },
    card: {
      height: 100
    },
  });

export default clubDetailsPage;