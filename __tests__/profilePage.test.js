import React from  'react';
import { render, fireEvent } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { View } from 'react-native';
import { Card } from 'react-native-paper';
import profilePage from '../screens/profilePage';


test('renders profilePage correctly', () => {
    const page = renderer.create(<profilePage/>).toJSON();
    expect(page).toMatchSnapshot();

});