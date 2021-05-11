import 'react-native-gesture-handler';
import { NavigationContainer} from '@react-navigation/native';
import React from 'react';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import clubHomePage from '../screens/clubHomePage';
import eventMapPage from '../screens/eventMapPage';
import clubHomePageStack from '../navigations/clubHomePageStack';


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
        name="eventMapPage"
        component={eventMapPage}
        options={{
          tabBarLabel: 'Event Map',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="map-marker" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
