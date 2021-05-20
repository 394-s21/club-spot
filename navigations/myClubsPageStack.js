import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import myClubsPage from '../screens/myClubsPage'
import clubDetailsPage from "../screens/clubDetailsPage";

const Stack = createStackNavigator();

export default function myClubsPageStack(){
    return(
        <Stack.Navigator
        initialRouteName = 'My Clubs'>
            <Stack.Screen
            name='My Clubs'
            component={myClubsPage}
            />
        </Stack.Navigator>
    )
}