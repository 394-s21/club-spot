import React from  'react';
import { render, fireEvent } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { View } from 'react-native';
import { Card } from 'react-native-paper';
import clubAnnouncementPage from '../screens/clubAnnouncementPage';


test('renders clubAnnouncementPage correctly', () => {
    const page = renderer.create(<clubAnnouncementPage/>).toJSON();
    expect(page).toMatchSnapshot();

});