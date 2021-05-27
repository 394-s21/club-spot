import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import createEventPage from "../screens/createEventPage";
import eventMapPage from "../screens/eventMapPage";

const Stack = createStackNavigator();

export default function eventMapPageStack(){
    return(
        <Stack.Navigator
        initialRouteName = 'eventMapPage'>
            <Stack.Screen
            name='Event Map'
            component={eventMapPage}
            options = {{headerShown: false}}
            />
        </Stack.Navigator>
    )
}