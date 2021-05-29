import {firebase} from './firebase';
import React, { useState, useEffect } from 'react';


const addFirebaseProperites = ()=>{
  var query = firebase.database().ref("/clubs/").orderByKey();
  query.once("value")
    .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        // key will be "ada" the first time and "alan" the second time
        var key = childSnapshot.key;
        var childRef = firebase.database().ref('/clubs/'+key);
        childRef.child('imageReset').set(false)
        // childData will be the actual contents of the child
        //var childData = childSnapshot.val();
        console.log(childRef.child('imageReset'))
    });
  });


}

export default addFirebaseProperites;