# Club Spot

## Table of Contents
1. [Overview](#Overview)
2. [Product Specifications](#Product-Specifications)
3. [Installation](#Installation)


## Overview 
### Description
We are creating a React Native app named ClubSpot that would help students find a club that suits their identities. The app will support functionalities such as search for new club, join a club, create events, and messaging.

This React Native app uses Expo managed workflow with Google Firebase as backend. The user needs to have a valid admin Gmail address or a Northwestern Gmail address in order to login. 

### App Evaluation
- **Category:** Service
- **Mobile:** This app would be developed for both android and IOS using Rect Native. 
- **Story:** The application allows you to  search for new club, join a club, create events, and messaging. User Data is pushed to the application and processed into an easily digestible form for users.
- **Market:** People who want to form good habits with other people.
- **Habit:** This app would ideally be used at least once a day

### Team members

| Name                   | 
|------------------------|
| Haley Hooper           |
| Patrick Pei            |
| Daniel Bang            |
| Jake Rogers            |
| Jipeng Sun             |
| Tony Bayvas            |
| Caroline Lobel         |



## Product Specifications
### 1. User Stories

**Required Must-have Stories**

* User can search clubs based on criteria
* User can post announcements to club members
* User can update club information and photo
* User can see how many club members joined

**Optional Nice-have Stories**
* User can message friends/groups in the same club
* User can create and view club events that are happening on or near campus

### 2. Screen Archetypes
* Login 
* My Club
* Choose Club Event
* Club Announcement
* Club Details
* Club Home
* Create Announcement 
* Create Event
* Event Map
* Group Chat
* Profile

### 3. Navigation
**Stack Navigation** (Screen to Screen) 

**Tab Navigation** (bottom tabs)

## Installation

### Fresh Installation: 
git pull everything in this repository. Then... 
```bash
npm install --global expo-cli
npm install --legacy-peer-deps
```

You should be good to go. 

**The package.json has been tested to be issue-free.**

## Installation Issues

**If any issue occurs, always try to remove node_modules and package-lock.json and npm install first.**
**If the issue does not resolve, try the following steps. The following steps would be the last you want to try.**

**DO NOT use npm install or npm remove individual components unless you are adding dependency to the project. Otherwise, it will break the package.json and leaves issues for others when they pulled.**

The following steps should resolve installation issues 99% of the time.**

```bash
rm -r node_modules
rm package-lock.json
git pull
npm install --legacy-peer-deps
```

**Remove only node_modules is not enough, remove package-lock.json as well because package-lock.json is customized for individual devices.**

If this fails to resolve the issue, then follow the following steps. 

### However, if you encountered the following issue: 

> Unable to resolve module 'react-native-keyboard-aware-scroll-view'

This is a new dependency. Be sure to remove node_modules and package-lock.json and npm install before using the following step. 

```bash
npm install --save react-native-keyboard-aware-scroll-view
```

### However, if you encountered the following issue: 

You should not have this issue if you have removed both node_modules and package-lock.json before npm install. 

> Unable to resolve module 'react-native-gesture-handler'

```bash
npm install react-native-gesture-handler
```

Expo should already included react-native-gesture-handler. You can check this with: 

```bash
npm list react-native-gesture-handler
```

### However, if you encountered the following issue: 

The react-native-gesture-handler comes with expo. There should be no separate react-native-gesture-handler in your package.json. 
Otherwise, the following error will appear. This issue should not appear if you have the up-to-date package.json. 

> Tried to register two views with the same name RNGestureHandlerButton

```bash
rm -r node_modules
rm package-lock.json
git pull
npm install --legacy-peer-deps
```

If the issue persist, 

```bash
rm -r node_modules/expo/node_modules/react-native-gesture-handler
```

### Creating a Firebase Database and adding Configuration
Go to https://console.firebase.google.com/u/0/ and create an account.

Create a new project with hosting and database capabilities.

Install the following 2 packages:

```
npm install -g firebase-tools
expo install firebase (if on Windows, run npm install firebase instead)
```
Then in your command line, you will create the configuration files to tell Firebase where to deploy your code.
Run:
```
firebase init
```
This will prompt you with several questions:
- Select "Use existing project" and then select the project you just created from the list that appears
- Select only DATABASE and HOSTING
- When it asks you where the web code is, enter WEB-BUILD
- When it asks if this is a single page app, say YES
- When it asks if you want Github integration, say NO
- Hit return to give the default answers for all other questions 

Next, go to your project app settings on the Firebase console, and scroll down to "Your apps".  
Select "config" in the SDK setup and configuration options, and copy the code that appears into the file "firebase.js", replacing ALL existing code in the file.

Next, go to the "database" tab on Firebase console. In the top right corner, click "import JSON".

Upload the "final_clubspot_json.json" file to load all existing club data.

### Address autocomplete:
In order for the address autocomplete to work when creating an event you must add a google maps API key in event map page
 
Go to https://developers.google.com/maps and follow steps to get API key

In the file screens/createEventPage.js, on line 154, replace 'REPLACE WITH YOUR OWN GOOGLE MAPS API KEY' with your google maps API key
Example: 
```
key: 'ABCDWYGJG1373GHJ13732'
```

### Testing the App
Enter the directory in your command line environment and run:
```
expo start
```
### Running the App

Enter the directory in your command line environment and run:
```
expo build:web
firebase deploy
```