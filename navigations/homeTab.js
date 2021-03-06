import 'react-native-gesture-handler';
import React from 'react';
import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import clubHomePageStack from '../navigations/clubHomePageStack';
import eventMapPageStack from '../navigations/eventMapPageStack';
import myClubPageStack from '../navigations/myClubPageStack';
import profilePage from '../screens/profilePage';


const Tab = createBottomTabNavigator();

export default function homeTab() {
  return (
    <Tab.Navigator
      initialRouteName="myClubPageStack"
      tabBarOptions={{
        activeTintColor: '#3DD5F4',
        activeBackgroundColor: "#4169E1",
        showLabel: 'false',
        tabStyle: {borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingTop: 0, height: 50, paddingTop: 4}
        
      }}>
      <Tab.Screen
        name="myClubPageStack"
        component={myClubPageStack}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={32} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="clubHomePageStack"
        component={clubHomePageStack}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" size={32} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="eventMapPageStack"
        component={eventMapPageStack}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="map-marker" size={32} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="profilePage"
        component={profilePage}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={32} color="black" />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
}
