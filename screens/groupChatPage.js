import React, { useState, useEffect, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StyleSheet, TextInput, View, YellowBox, Button, Text } from 'react-native'
import * as firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB0YH7-jSrWvmBEaK8xvrnBT8sAYlV86fM",
  authDomain: "club-spot.firebaseapp.com",
  databaseURL: "https://club-spot-default-rtdb.firebaseio.com",
  projectId: "club-spot",
  storageBucket: "club-spot.appspot.com",
  messagingSenderId: "466909196535",
  appId: "1:466909196535:web:6493f5913630fb11ede3f2",
  measurementId: "G-LNVM4T5KBN"
};

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}

YellowBox.ignoreWarnings(['Setting a timer for a long period of time'])


const groupChatPage = ({route, navigation}) => {
    // read groupID, userID and userFirstName from the navigation parameters
    const {groupID, _id, name} = route.params
    console.log(`groupID, userID, userFirstName ${groupID}, ${_id}, ${name}`)
    const user = { _id, name }
    AsyncStorage.setItem('user', JSON.stringify(user))
    const [messages, setMessages] = useState([])
    const db = firebase.firestore()
    
    const chatsRef = db.collection(groupID.toString()) 

    useEffect(() => {
        readUser()
        const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
            const messagesFirestore = querySnapshot
                .docChanges()
                .filter(({ type }) => type === 'added')
                .map(({ doc }) => {
                    const message = doc.data()
                    //createdAt is firebase.firestore.Timestamp instance
                    //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
                    return { ...message, createdAt: message.createdAt.toDate() }
                })
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            appendMessages(messagesFirestore)
        })
        console.log(`In useEffect, user is ${JSON.stringify(user)}`)
        return () => unsubscribe()
    }, [])

    const appendMessages = useCallback(
        (messages) => {
            setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
        },
        [messages]
    )

    async function readUser() {
        const myUser = await AsyncStorage.getItem('user')
        console.log(`In readUser, user is ${myUser}`)
        if (myUser === JSON.stringify(user)){
            console.log(`they are same ${myUser}, ${JSON.stringify(user)}`)
        }
    }

    async function removeUser() {
        const user = await AsyncStorage.removeItem('user')
        console.log(`user ${user} removed`)
    }

    async function handleSend(messages) {
        const writes = messages.map((m) => chatsRef.add(m))
        await Promise.all(writes)
    }
    return <GiftedChat messages={messages} user={user} onSend={handleSend} />
}
export default groupChatPage;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    input: {
        height: 50,
        width: '100%',
        borderWidth: 1,
        padding: 15,
        marginBottom: 20,
        borderColor: 'gray',
    },
})
