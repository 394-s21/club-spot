import React from  'react';
import { render, fireEvent } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { View } from 'react-native';
import { Card } from 'react-native-paper';
import createAnnouncementPage from '../screens/createAnnouncementPage';


test('renders createAnnouncementPage correctly', () => {
    const page = renderer.create(<createAnnouncementPage/>).toJSON();
    expect(page).toMatchSnapshot();

});