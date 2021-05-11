import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import clubDetailsPage from "../screens/clubDetailsPage";
import clubHomePage from "../screens/clubHomePage";

const Stack = createStackNavigator();

export default function ClubHomePageStack(){
    return(
        <Stack.Navigator
        initialRouteName = 'clubHomePage'>
            <Stack.Screen
            name='Club List'
            component={clubHomePage}
            />
            <Stack.Screen
            name='Club Details'
            component={clubDetailsPage}
            />
        </Stack.Navigator>
    )
}