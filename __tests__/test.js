import { render, fireEvent } from '@testing-library/jest-native';
import {clubCard} from '../components/CommonCompClubCard';
import {clubHomePage} from '../screens/clubHomePage';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Card } from 'react-native-paper';
// test('renders correctly across screens', () => {
//   const tree = renderer.create(<CommonCompEventCard />).toJSON();
//   expect(tree).toMatchSnapshot();
// })

//hello
//Wowowow 
//

test('test handle search query', ()=> {
  const input = ["TEST CLUB","This club is a test. Now I can edit the description of this club","Identity-Based","clobel88@gmail.com",'101010']
  const mockFn = jest.fn()

  const {clubComp} = render(
    /*<CommonCompClubCard 
              clubName="TEST CLUB"
              key="TEST CLUB"
              clubDesc= "This club is a test. Now I can edit the description of this club"
              clubCategory= "Identity-Based"
              clubEmail = "clobel88@gmail.com"
              clubId = "101010"
              navigation = {null}/>*/

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

    expect(mockFn).toBeCalledWith({input})

}) 