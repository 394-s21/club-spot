import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { firebase }  from '../utils/firebase';
import { Avatar,Provider, TextInput, RadioButton,Text, Subheading,Title, Card, Button,Paragraph, Dialog, Portal } from 'react-native-paper';

class profilePage extends Component{
  // TODO: add more user info later once the design has finalized
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      userId: firebase.auth().currentUser.uid,
      edit: false,
      new_name: null,
      new_major: null,
      new_year: null
    }
    this.get_profile_comp = this.get_profile_comp.bind(this);
    this.edit = this.edit.bind(this)
    this.save = this.save.bind(this)
    this.cancel_edit = this.cancel_edit.bind(this)
  }

  edit = () => {
    this.setState({edit: true});
  }
  cancel_edit = () => {
    this.setState({edit: false});
  }

  save = () => {
    var new_userInfo = this.state.userInfo
    const userId = this.state.userId
    this.setState({edit: false})
    const db = firebase.database().ref('/users')
    if (this.state.new_name !== null) {
      const new_name = this.state.new_name.split(' ')
      const first = new_name[0]
      const last = new_name[1]
      db.child('/'+userId +'/first_name').set(first)
      db.child('/'+userId +'/last_name').set(last)
      new_userInfo.first_name = first
      new_userInfo.last_name = last
    }
    if (this.state.new_major !== new_userInfo.major) {
      const new_major = this.state.new_major
      db.child('/'+userId +'/major').set(new_major)
      new_userInfo.major = new_major
    }
    if (this.state.new_year !== new_userInfo.graduation_year) {
      const new_year = this.state.new_year
      db.child('/'+userId +'/graduation_year').set(new_year)
      new_userInfo.graduation_year = new_year
    }
    this.setState({userInfo: new_userInfo})


  }


  logout = () => {
    firebase.auth().signOut()
    this.props.navigation.replace('loginPage');
  }

  componentDidMount() {
    const userId = this.state.userId
    console.log('userID: ',userId)
    const db = firebase.database().ref('/users/'+userId);
    var user = {}
    db.on('value', (snapshot) => {
      if (snapshot.exists()) {
        user = snapshot.toJSON()
        console.log('user: ',user)
      }
      this.setState({userInfo: user,
                    new_year: user.graduation_year,
                  new_major: user.major,
                  new_name: user.first_name+' '+user.last_name
                  })
      console.log('userInfo: ',this.state.userInfo)
      });
  };

  get_profile_comp = () => {
    const user = firebase.auth().currentUser
    console.log('user: ',user)
    if (user.photoURL === '..') {
      return <Avatar.Image size={65} source={user.profile_picture} style={styles.prof_pic}/>
    }
    else {
      var userInitials = user.displayName.split(' ')
      userInitials = userInitials[0].substring(0,1) + userInitials[1].substring(0,1)
      console.log('userInitials: ',userInitials);
      return <Avatar.Text size={65} label={userInitials} style={styles.prof_pic}/>
    }
  }

  render() {
    console.log('this.state.userInfo in render: ',this.state.userInfo)
    const user = this.state.userInfo;
    console.log('user in render: ',user)
    //console.log('user: ',user)
    const email = user.gmail;
    const full_name = user.first_name+' '+user.last_name;
    const year = user.graduation_year
    const major = user.major
    const edit = this.state.edit
   
    if (edit) {
      return (


        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.container}>
              {this.get_profile_comp()}
              <Title style={styles.subheading}>{full_name}</Title>
            </View>
            <Subheading>PERSONAL INFORMATION</Subheading>
            <Card style={styles.card}>
                <Card.Content>
                  <Text>Email: {email}</Text>
                    {/*TODO: CHECK FOR PHONE NUMBER AND DISPLAY IF PRESENT */}
                </Card.Content>
            </Card>
            <Card style={styles.card}>
                <Card.Content>
                  <TextInput mode="flat"
                              label="Graduation Year"
                              value={this.state.new_year}
                              dense="true"
                              onChangeText={text => this.setState({new_year:text})} />
                    {/*TODO: CHECK FOR PHONE NUMBER AND DISPLAY IF PRESENT */}
                </Card.Content>
            </Card>
            <Card style={styles.card}>
                <Card.Content>
                <TextInput mode="flat"
                              label="Major"
                              value={this.state.new_major}
                              dense="true"
                              onChangeText={text => this.setState({new_major:text})} />
                </Card.Content>
            </Card>
            <View style={styles.row}>
            <Button mode="contained" dark="true" style={styles.logoutButton} onPress={this.save}>SAVE </Button>
            <Button mode="contained" dark="true" style={styles.logoutButton} onPress={this.cancel_edit}>CANCEL </Button>
            </View>
            
            <View style={styles.row}>
              <Button mode="contained" dark="true" style={styles.logoutButton} onPress={this.logout}>logout </Button>
            </View>
        </ScrollView>
        </SafeAreaView>
        
      )
    }
    else {
      return (

        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.container}>
              {this.get_profile_comp()}
              <Title style={styles.subheading}>{full_name}</Title>
            </View>
            <Subheading>PERSONAL INFORMATION</Subheading>
            <Card style={styles.card}>
                <Card.Content>
                  <Text>Email: {email}</Text>
                    {/*TODO: CHECK FOR PHONE NUMBER AND DISPLAY IF PRESENT */}
                </Card.Content>
            </Card>
            <Card style={styles.card}>
                <Card.Content>
                  <Text>Graduation Year: {year}</Text>
                    {/*TODO: CHECK FOR PHONE NUMBER AND DISPLAY IF PRESENT */}
                </Card.Content>
            </Card>
            <Card style={styles.card}>
                <Card.Content>
                  <Text>Major: {major}</Text>
                    {/*TODO: CHECK FOR PHONE NUMBER AND DISPLAY IF PRESENT */}
                </Card.Content>
            </Card>
            <View style={styles.row}>
            <Button mode="contained" dark="true" style={styles.logoutButton} onPress={this.edit}>EDIT </Button>
            </View>
            <View style={styles.row}>
              <Button mode="contained" dark="true" style={styles.logoutButton} onPress={this.logout}>logout </Button>
            </View>
        </ScrollView>
        </SafeAreaView>
        
      ) }
  }
}

const styles = StyleSheet.create({
  row: {
    marginLeft: 8,
    marginRight: 8,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    backgroundColor: '#000000',
    marginTop: 26,
    width: "30%",
    marginLeft: 5,
    marginRight: 5
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1'
  },
  card: {
    marginTop: 5,
    marginBottom: 5,
    backgroundColor:'white',
    width: 350
  },
  prof_pic: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 18
  },
  subheading: {
    fontWeight: "600",
    height: 35,
    marginBottom: 15,
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  }
})
export default profilePage;