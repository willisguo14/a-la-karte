import { createSelector, createSlice } from "@reduxjs/toolkit";
import firebase from "firebase";

// export type AuthStatusType = "SIGNED_IN" | "NOT_SIGNED_IN" | "UNDETERMINED";

// export type UserReduxType = {
//   authStatus: AuthStatusType;
//   user: UserDocument | null;
// };

const initialState = {
  restaurant: null,
};

export const getRestaurantReducer = (state) => state.restaurant;
export const getRestaurant = createSelector(
  [getRestaurantReducer],
  (restaurantReducer) => restaurantReducer.restaurant
);

export const fetchRestaurant = async (dispatch) => {
  await firebase
    .firestore()
    .collection("restaurant")
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then((snapshot) => {
      if (snapshot.exists) {
        //console.log(snapshot.data())
        //dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
        dispatch(setRestaurant(snapshot.data()));
      } else {
        console.log("does not exist");
      }
    });
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setRestaurant: (state, action) => ({
      ...state,
      restaurant: action.payload,
    }),
  },
});

export const { setRestaurant } = restaurantSlice.actions;
export const restaurantReducer = restaurantSlice.reducer;
