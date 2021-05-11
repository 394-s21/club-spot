import React, { Component } from 'react';
import clubHomePage from './clubHomePage';
import { StyleSheet, View, Text, Image, SafeAreaView } from 'react-native';



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
                <Text>{this.state.clubName}</Text>
                <Text>{this.state.clubDesc}</Text>
            </SafeAreaView>
        )
    }

}



export default clubDetailsPage;