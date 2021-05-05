import 'react-native-gesture-handler';
import React from 'react';
import clubHomePage from './screens/clubHomePage';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="clubHomePage" 
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen
          name="clubHomePage"
          component={clubHomePage}
        />
      </Stack.Navigator>
    </NavigationContainer>)}
