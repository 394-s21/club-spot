import React from  'react';
import { render, fireEvent } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { View } from 'react-native';
import { Card } from 'react-native-paper';
import myClubPage from '../screens/myClubPage';


test('renders myClubPage correctly', () => {
    const page = renderer.create(<myClubPage/>).toJSON();
    expect(page).toMatchSnapshot();

});