import React from  'react';
import { render, fireEvent } from '@testing-library/react-native';
import { View } from 'react-native';
import { Card } from 'react-native-paper';

test('test handle search query', ()=> {
  const input = ["TEST CLUB","This club is a test. Now I can edit the description of this club","Identity-Based","clobel88@gmail.com",'101010']
  const mockFn = jest.fn()
  const {clubComp} = render(
    <View >
      <Card 
      onPress={mockFn}>
        <Card.Title
          title="TEST CLUB"
          subtitle= "This club is a test. Now I can edit the description of this club"
          />
      </Card>
    </View>
  );
  expect(mockFn).not.toBeNull()
  expect(clubComp).not.toBeNull()
}) 