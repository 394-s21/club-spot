import React from  'react';
import { render, fireEvent } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { View } from 'react-native';
import { Card } from 'react-native-paper';
import chooseClubEventPage from '../screens/chooseClubEventPage';


test('renders chooseClubEventPage correctly', () => {
    const page = renderer.create(<chooseClubEventPage/>).toJSON();
    expect(page).toMatchSnapshot();

});