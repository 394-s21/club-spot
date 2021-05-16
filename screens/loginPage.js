import React, { Component } from 'react';
import { View, SafeAreaView, Alert } from 'react-native';
import firebase from 'firebase';
import SocialButton from "../components/CommonCompGoogleSignIn"
import {firebaseConfig} from '../config';
import * as Google from 'expo-google-app-auth';

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}
class loginPage extends Component {
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

  onSignIn = googleUser => {
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
              if (result.additionalUserInfo.isNewUser) {
                year = result.user.email.split('@')[0]
                year = year.substring(year.length-4,year.length);
                console.log('year: ',year)
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
                    major: 'Undecided'
                    
                  })
                  .then(function(snapshot) {
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
      const result = await Google.logInAsync({
        behavior: 'web',
        iosClientId: "466909196535-dggm9cf6srskpkam9c178l6iv6dsei5m.apps.googleusercontent.com",
        androidClientId: "466909196535-36phdgnp6t0n65dc8isvj8e7veap29nv.apps.googleusercontent.com",
        scopes: ['profile', 'email']
      });
      if (result.type === 'success' && result.user.email.includes('@u.northwestern.edu')) {
        this.onSignIn(result);
        console.log(`successful sign in with userId ${firebase.auth().currentUser.uid}`)
        return result.accessToken;
      } else {
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
    <SafeAreaView style={{ backgroundColor: "#3DD5F4", flex: 1 }}>
      <View style={{justifyContent: "center", alignItems: "center",}}>
      
      <SocialButton
        buttonTitle='Sign In With Google'
        btnType='google'
        color='#de4d41'
        backgroundColor='#f5e7ea' 
        onPress = {() => this.signInWithGoogleAsync()}
        ></SocialButton>
        </View>
    </SafeAreaView>);
  }
}
export default loginPage;