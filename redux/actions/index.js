import firebase from "firebase";

import { USER_STATE_CHANGE } from "../constants/index";
import { RESTAURANT_STATE_CHANGE } from "../constants/index";

export function fetchUser() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          // console.log(snapshot.data())
          dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
        } else {
          console.log("does not exist");
        }
      });
  };
}

export function fetchRestaurant() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("restaurant")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          console.log("actions below");
          console.log(snapshot.data());
          dispatch({
            type: RESTAURANT_STATE_CHANGE,
            currentRestaurant: snapshot.data(),
          });
        } else {
          console.log("does not exist");
        }
      });
  };
}
