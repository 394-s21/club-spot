import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import clubAnnouncementPage from "../screens/clubAnnouncementPage";
import myClubPage from "../screens/myClubPage";
import createEventPage from "../screens/createEventPage";

const Stack = createStackNavigator();

export default function myClubPageStack(){
    return(
        <Stack.Navigator
        initialRouteName = 'My Clubs'>
            <Stack.Screen
            name='My Clubs'
            component={myClubPage}
            />
            <Stack.Screen
            name='Club Announcement'
            component={clubAnnouncementPage}
            />
            <Stack.Screen
            name='Create Event'
            component={createEventPage}
            />
        </Stack.Navigator>
    )
}