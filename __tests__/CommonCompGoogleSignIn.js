import React from  'react';
import { render,fireEvent } from '@testing-library/react-native';
import button from '../components/CommonCompGoogleSignIn';

// mock the font awesome object
jest.mock('react-native-vector-icons/FontAwesome', () => 'FontAwesome')

// Describing our club card test
describe('<signInButton />', () => {
  it('sign in button should be rendered properly', ()=> {
    const {getByTestId} = render(
      <button />
    );
    // get the button component
    expect(getByTestId).not.toBeNull()
  }) 
})