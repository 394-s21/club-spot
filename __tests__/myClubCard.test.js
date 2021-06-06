import React from  'react';
import { render,fireEvent } from '@testing-library/react-native';
import { 
  mockClubName,
  mockClubDesc,
  mockClubCategory,
  mockClubEmail,
  mockNavigation,
  mockClubId,
} from "../utils/mock";
import Card from '../components/CommonCompMyClubCard';

// Describing our club card test
describe('<MyClubCard />', () => {
  it('test my club card should be rendered properly', ()=> {
    const {getByTestId} = render(
      <Card 
        clubName = {mockClubName}
        clubDesc = {mockClubDesc}
        clubCategory = {mockClubCategory}
        navigation = {mockNavigation}
        clubEmail = {mockClubEmail}
        clubId = {mockClubId}
        isViewClub = {false}
      />
    );
    // get the card component
    const clubCard = getByTestId("myCard")
    expect(getByTestId).not.toBeNull()
    expect(clubCard).not.toBeNull()
  }) 
})