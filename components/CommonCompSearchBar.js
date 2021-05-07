import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import { Searchbar } from 'react-native-paper';

class Search extends Component {

  render() {
    return (
      <Searchbar 
        placeholder="search"
        style={styles.searchBar}
      />
    );
}
}

const styles = StyleSheet.create({
    searchBar: {
        borderRadius: 30,
        marginHorizontal: 8,
        
    }
})

export default Search;