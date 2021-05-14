import 'react-native-gesture-handler';
import React from 'react';
import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import clubHomePageStack from '../navigations/clubHomePageStack';
import eventMapPageStack from '../navigations/eventMapPageStack';
import profilePage from '../screens/profilePage';


const Tab = createBottomTabNavigator();

export default function homeTab() {
  return (
    <Tab.Navigator
      initialRouteName="clubHomePageStack"
      tabBarOptions={{
        activeTintColor: '#3DD5F4',
      }}>
      <Tab.Screen
        name="clubHomePageStack"
        component={clubHomePageStack}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="eventMapPageStack"
        component={eventMapPageStack}
        options={{
          tabBarLabel: 'Event Map',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="map-marker" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="profilePage"
        component={profilePage}
        options={{
          tabBarLabel: 'profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
