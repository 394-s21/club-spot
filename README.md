# Club Spot

## Table of Contents
1. [Overview](#Overview)
2. [Product Specifications](#Product-Specifications)
3. [Installation](#Installation)


## Overview 
### Description
Our development team is purple, a project team for CS 394 in Spring 2021. We are creating a React Native app named Cosava that would help people form good habits either as a group or individually. The app will support functionalities such as create new habit, join a group, streak logging, and messaging.

This React Native app uses Expo managed workflow with Google Firebase as backend. The user needs to have a Gmail address in order to login. 

### App Evaluation
- **Category:** Service
- **Mobile:** This app would be developed for both android and IOS using Rect Native. 
- **Story:** The application allows you to create different groups with different habits. User Data is pushed to the application and processed into an easily digestible form for users.
- **Market:** People who want to form good habits with other people.
- **Habit:** This app would ideally be used at least once a day

### Team members

| Name                   | 
|------------------------|
| Patrick Pei            |
| Daniel Bang            |
| Jake Rogers            |
| Jipeng Sun             |
| Tony Bayvas            |
| Caroline Lobel         |



## Product Specifications
### 1. User Stories

**Required Must-have Stories**

* User logs in to home page and other pertinent information
* User creates new groups
* User joins new groups
* User logs streaks daily

**Optional Nice-have Stories**
* User chats with other friends in a group

### 2. Screen Archetypes
* Login 
* Dashboard 
* Create Group
* Join Group
* Chat

### 3. Navigation
**Flow Navigation** (Screen to Screen)

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
