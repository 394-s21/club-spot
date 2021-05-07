import 'react-native-gesture-handler';
import React from 'react';
import homeTab from './navigations/homeTab';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import eventMapPage from './screens/eventMapPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="homeTab" 
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen
          name="homeTab"
          component={homeTab}
        />
      </Stack.Navigator>
    </NavigationContainer>)}
