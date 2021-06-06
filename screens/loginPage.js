import React, { Component } from 'react';
import { View, SafeAreaView, Alert, Image } from 'react-native';
import firebase from 'firebase';
import SocialButton from "../components/CommonCompGoogleSignIn"
import {firebaseConfig} from '../config';
import * as Google from 'expo-google-app-auth';

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}
class loginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clubEmailsDict: {},
      clubEmailsArr: []
      
    };
  }



  loginFailed() {
      Alert.alert(
          "Login In Failed",
          "Please try again with your Northwestern Email.",
          [
              { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
      );
  }

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };

  onSignIn = (googleUser,admin,club) => {
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function(firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInAndRetrieveDataWithCredential(credential)
            .then(function(result) {
              
              
              if (result.additionalUserInfo.isNewUser && admin) {
                
                year = 'NA'

                console.log('making admin account')
                firebase
                  .database()
                  .ref('/users/' + result.user.uid)
                  .set({
                    gmail: result.user.email,
                    profile_picture: result.additionalUserInfo.profile.picture,
                    first_name: result.additionalUserInfo.profile.given_name,
                    last_name: result.additionalUserInfo.profile.family_name,                      created_at: Date.now(),
                    graduation_year: year,
                    major: 'NA',
                    admin: true,
                    clubAdminId: club
                    
                  })
                  .then(function(snap) {
                    const clubRef = firebase.database().ref('/users/'+result.user.uid+'/clubs')
                    clubRef.once("value")
                      .then(snapshot => {
                          if(snapshot === null || snapshot.val() === null){ // user's first time join a club
                              console.log(`user's first time`)
                              clubRef.child(club).set(1); // set user's clubId ref to be 1 (indicate the user is joined)
                          } else {
                              if(snapshot.val().hasOwnProperty(clubId)){
                                  console.log(`found the club ${club}`);
                               } else{
                                  console.log(`not found the club ${club}`);
                                  clubRef.child(club).set(1);
                              }
                          } 
                      })
                  }); }
              else if (result.additionalUserInfo.isNewUser){
                year = result.user.email.split('@')[0]
                year = year.substring(year.length-4,year.length);
                console.log('year: ',year)

                console.log('making normal account')
                firebase
                  .database()
                  .ref('/users/' + result.user.uid)
                  .set({
                    gmail: result.user.email,
                    profile_picture: result.additionalUserInfo.profile.picture,
                    first_name: result.additionalUserInfo.profile.given_name,
                    last_name: result.additionalUserInfo.profile.family_name,
                    created_at: Date.now(),
                    graduation_year: year,
                    major: 'Undecided',
                    admin: false,
                    clubAdminId: ""
                    
                  })
                  .then(function(snapshot) {
                  }); 
              
              }   
              else {
              firebase
                .database()
                .ref('/users/' + result.user.uid)
                .update({
                  last_logged_in: Date.now()
                });
            }
          })
            .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
          console.log('User already signed-in Firebase.');
        }
      }.bind(this)
    );
  };

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        behavior: 'web',
        iosClientId: "Replace With Your Credential",
        androidClientId: "Replace With Your Credential",
        scopes: ['profile', 'email']
      });
      if (result.type === 'success' && this.state.clubEmailsArr.includes(result.user.email)) {
        this.onSignIn(result,true,this.state.clubEmailsDict[result.user.email]);
        console.log(`successful sign in with userId ${firebase.auth().currentUser.uid}`)
        return result.accessToken;
      }
      else if (result.type === 'success' && result.user.email.includes('@u.northwestern.edu') ) {
        this.onSignIn(result,false,null);
        console.log(`successful sign in with userId ${firebase.auth().currentUser.uid}`)
        return result.accessToken;
      } 
      
      else {
        this.loginFailed();
        return { cancelled: true };
      }
    } catch (e) {
      console.log(e.code)
      return { error: true };
    }
  };

  componentDidMount() {
    this.checkIfLoggedIn();
    this.setState({clubEmails: []});
    const db = firebase.database().ref('/clubs');
    
    db.on('value', (snapshot) => {
      if (snapshot.exists()) {
        
        const clubEmailsArray = []
        const clubEmailsDictionary = {}
        snapshot.forEach(function (childSnapshot) {
          let childSnap = childSnapshot.toJSON();
          clubEmailsDictionary[childSnap.email] = childSnap.id.toString()
          clubEmailsArray.push(childSnap.email)
          
        });
      this.setState({clubEmailsDict: clubEmailsDictionary, clubEmailsArr: clubEmailsArray});
      }
    })
   
  }

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(
      function(user) {
        console.log('AUTH STATE CHANGED CALLED ')
        if (user) {
          this.props.navigation.replace('homeTab');
        } else {
          this.props.navigation.navigate('loginPage');

        }
      }.bind(this)
    );
  };

  render() {
    return (
    <SafeAreaView style={{ backgroundColor: "#4169E1", flex: 1 }}>
      <View style={{justifyContent: "center", alignItems: "center"}}>
        <View>
      <Image style={{width: 350, height: 250, resizeMode: 'contain'}} source={require('../assets/ClubSpot.png')} />
      </View>
      <View style={{height: '60%', justifyContent: 'center'}}>
      <SocialButton
        buttonTitle='Sign In With Google'
        btnType='google'
        color='#4169E1'
        backgroundColor='#f5e7ea' 
        onPress = {() => this.signInWithGoogleAsync()}
        ></SocialButton>
        </View>
        </View>
    </SafeAreaView>);
  }
}
export default loginPage;