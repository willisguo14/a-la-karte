import { RESTAURANT_STATE_CHANGE } from "../constants/index";

const initialState = {
  currentRestaurant: null,
};

export const restaurant = (state = initialState, action) => {
    console.log("reducer below")
    console.log(action.currentRestaurant);
  return {
    ...state,
    currentRestaurant: action.currentRestaurant,
  };
  //   switch (action.type) {
  //     case RESTAURANT_STATE_CHANGE:
  //       return {
  //         ...state,
  //         currentRestaurant: action.currentRestaurant,
  //       };
  //     default:
  //       return state;
  //   }
};
