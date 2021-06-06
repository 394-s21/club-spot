import React from  'react';
import { render,fireEvent } from '@testing-library/react-native';
import { 
  mockClubName,
  mockClubDesc,
  mockClubCategory,
  mockClubEmail,
  mockImageReset,
  mockNavigation,
  mockClubId,
} from "../utils/mock";
import Card from '../components/CommonCompClubCard';

// Describing our club card test
describe('<ClubCard />', () => {
  it('test club card should be rendered properly', ()=> {
    const {getByTestId} = render(
      <Card 
        clubName = {mockClubName}
        clubDesc = {mockClubDesc}
        clubCategory = {mockClubCategory}
        clubEmail = {mockClubEmail}
        imageReset = {mockImageReset}
        navigation = {mockNavigation}
        clubId = {mockClubId}
      />
    );
    // get the card component
    const clubCard = getByTestId("myCard")
    expect(getByTestId).not.toBeNull()
    expect(clubCard).not.toBeNull()
  }) 
})