import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { restaurantReducer } from "./restaurant";
import { userReducer } from "./user";

export const ReduxReducers = combineReducers({
  restaurant: restaurantReducer,
  user: userReducer
});

const makeStore = () =>
  configureStore({
    reducer: ReduxReducers,
    
  });

export const reduxStore = makeStore();
