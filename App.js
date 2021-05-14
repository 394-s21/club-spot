import 'react-native-gesture-handler';
import React from 'react';
import homeTab from './navigations/homeTab';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import loginPage from './screens/loginPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="loginPage" // TODO: change back to login in the final stage
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen
          name="homeTab"
          component={homeTab}
        />
        <Stack.Screen
          name="loginPage"
          component={loginPage}
        />
      </Stack.Navigator>
    </NavigationContainer>)}
