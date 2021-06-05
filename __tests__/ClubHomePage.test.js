import React from  'react';
import { render, fireEvent } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { View } from 'react-native';
import { Card } from 'react-native-paper';
import clubHomePage from '../screens/clubHomePage';


test('renders clubHomePage correctly', () => {
    const page = renderer.create(<clubHomePage/>).toJSON();
    expect(page).toMatchSnapshot();

});