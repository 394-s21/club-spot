import React from  'react';
import { render,fireEvent } from '@testing-library/react-native';
import { 
  mockTitle,
  mockDescription,
  mockAddress,
  mockDate,
  mockTime
} from "../utils/mock";
import Card from '../components/CommonCompMyClubCard';

// Describing our event card test
describe('<EventCard />', () => {
  it('test my club card should be rendered properly', ()=> {
    const {getByTestId} = render(
      <Card 
        title = {mockTitle}
        description = {mockDescription}
        address = {mockAddress}
        date = {mockDate}
        time = {mockTime}
      />
    );
    // get the card component
    expect(getByTestId).not.toBeNull()
  }) 
})