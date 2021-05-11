import React, { Component } from 'react';
import clubHomePage from './clubHomePage';
import { StyleSheet, View, Text, Image, SafeAreaView, ScrollView } from 'react-native';



class clubDetailsPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            clubName : this.props.route.params.clubName,
            clubDesc : this.props.route.params.clubDesc,
            clubCategory: this.props.route.params.clubCategory,
            clubEmail: this.props.route.params.clubEmail
        }
    }


    render(){
        return(
            <View style={styles.backcover}>
            <SafeAreaView>
                <ScrollView>
                    <View style = {styles.view}>
                    <Text style = {styles.title}>
                    {this.state.clubName}
                        {'\n'}
                    </Text>
                    <Text style = {styles.subtitle}>
                        Category:
                    </Text>
                    <Text style = {styles.clubDescription}>
                        {this.state.clubCategory}
                        {'\n'}
                    </Text>
                    <Text style = {styles.subtitle}>
                        Email:
                    </Text>
                    <Text style = {styles.email}>
                        {this.state.clubEmail}
                        {'\n'}
                    </Text>
                    <Text style = {styles.subtitle}>
                        Description:
                    </Text>
                    <Text style = {styles.clubDescription}>
                        {this.state.clubDesc}
                    </Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    title: {
      fontSize: 22,
      paddingTop: 10,
      fontWeight: 'bold'
    },
    subtitle:{
      fontSize: 16,
      fontWeight: 'bold'
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
    email:{
    color:'blue',
    textDecorationLine:'underline'
    },
    view:{
        padding:20,
        backgroundColor: 'white'
    },
    backcover:{
        backgroundColor: 'white'
    }
  });

export default clubDetailsPage;