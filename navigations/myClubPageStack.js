import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import clubAnnouncementPage from "../screens/clubAnnouncementPage";
import myClubPage from "../screens/myClubPage";
import groupChatPage from "../screens/groupChatPage";

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
            name='Chat'
            component={groupChatPage}
            />
        </Stack.Navigator>
    )
}