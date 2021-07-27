import { createSelector, createSlice } from "@reduxjs/toolkit";
import firebase from "firebase";

const initialState = {
  user: null,
};

export const getUserReducer = (state) => state.user;
export const getUser = createSelector(
  [getUserReducer],
  (userReducer) => userReducer.user
);

export const fetchUser = async (dispatch) => {
  await firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then((snapshot) => {
      if (snapshot.exists) {
        //console.log(snapshot.data())
        //dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
        dispatch(setUser(snapshot.data()));
      } else {
        console.log("does not exist");
      }
    });
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => ({
      ...state,
      user: action.payload,
    }),
  },
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
