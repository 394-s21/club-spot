import React from  'react';
import { render,fireEvent } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { 
  mockClubId,
  mockIsViewClub,
} from "../utils/mock";
import Image from '../components/CommonCompPickImage';

// mock the image picker object
jest.mock('expo-image-picker', () => 'ImagePicker')

test('renders pick image correctly', () => {
  const page = renderer.create(<Image/>).toJSON();
  expect(page).toMatchSnapshot();
}); 