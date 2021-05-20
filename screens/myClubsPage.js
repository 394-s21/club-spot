import React, { Component, useState } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import CommonCompClubCard from '../components/CommonCompClubCard';
import DropDown from "react-native-paper-dropdown";
import { firebase }  from '../utils/firebase';
import 'firebase/database';
import { Provider, TextInput, RadioButton,Text, Subheading,Card, Button,Paragraph, Dialog, Portal } from 'react-native-paper';
import filter from 'lodash.filter';
import { version } from 'react';

class myClubsPage extends Component{
    render(){
        return(
            <View></View>
        )
    }
}

export default myClubsPage;