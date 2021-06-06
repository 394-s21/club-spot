import React from  'react';
import { render, fireEvent } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { View } from 'react-native';
import { Card } from 'react-native-paper';
import App from '../App';
//import createIconSet from './createIconSet';

// mock the objects
jest.mock('@expo/vector-icons', () => 'Icon')
jest.mock('expo-image-picker', () => 'ImagePicker')

jest.mock('@react-navigation/stack', () => 'StackNavigator')
//jest.mock('@react-navigation/stack', () => 'StackNavigator')

test('renders App Navigation correctly', () => {
    const page = renderer.create(<App/>).toJSON();
    expect(page).toMatchSnapshot();
});