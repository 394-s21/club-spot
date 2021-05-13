import React, { Component } from 'react';
import { View, SafeAreaView } from 'react-native';
import firebase from 'firebase';
import SocialButton from "../components/CommonCompGoogleSignIn"
import {firebaseConfig} from '../config';
import * as Google from 'expo-google-app-auth';

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}
class loginPage extends Component {
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

  onSignIn = googleUser => {
    // console.log('Google Auth Response', googleUser);
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
              console.log('user signed in ');
              if (result.additionalUserInfo.isNewUser) {
                firebase
                  .database()
                  .ref('/users/' + result.user.uid)
                  .set({
                    gmail: result.user.email,
                    profile_picture: result.additionalUserInfo.profile.picture,
                    first_name: result.additionalUserInfo.profile.given_name,
                    last_name: result.additionalUserInfo.profile.family_name,
                    created_at: Date.now()
                  })
                  .then(function(snapshot) {
                    // console.log('Snapshot', snapshot);
                  });
              } else {
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
      console.log("attemp to sign in with google")
      const result = await Google.logInAsync({
        behavior: 'web',
        iosClientId: "466909196535-dggm9cf6srskpkam9c178l6iv6dsei5m.apps.googleusercontent.com",
        // androidClientId: "547778785940-c4auvl9ajnaba4omhbgrqgkp7aaun0uh.apps.googleusercontent.com",
        scopes: ['profile', 'email']
      });
      console.log(`result is ${result.type}`)
      if (result.type === 'success') {
        this.onSignIn(result);
        console.log(`successful sign in with userId ${firebase.auth().currentUser.uid}`)
        return result.accessToken;
      } else {
        console.log("cancelled sign in")
        this.props.navigation.navigate('Login');
        return { cancelled: true };
      }
    } catch (e) {
      console.log(e.code)
      return { error: true };
    }
  };

  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(
      function(user) {
        console.log('AUTH STATE CHANGED CALLED ')
        console.log(`user is ${user}`)
        if (user) {
          this.props.navigation.navigate('homeTab');
        } else {
          this.props.navigation.navigate('loginPage');
        }
      }.bind(this)
    );
  };

  render() {
    return (
    <SafeAreaView style={{ backgroundColor: "#3DD5F4", flex: 1 }}>
      <View style={{justifyContent: "center", alignItems: "center",}}>
      </View>
      <SocialButton
        buttonTitle='Sign In With Google'
        btnType='google'
        color='#de4d41'
        backgroundColor='#f5e7ea' 
        onPress = {() => this.signInWithGoogleAsync()}
        ></SocialButton>
    </SafeAreaView>);
  }
}
export default loginPage;