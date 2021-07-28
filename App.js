import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { View, Text } from "react-native";

import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAdplAU454bEsXdFpmqjWraQH2IlWlRPp8",
  authDomain: "mobile-app-7e96e.firebaseapp.com",
  projectId: "mobile-app-7e96e",
  storageBucket: "mobile-app-7e96e.appspot.com",
  messagingSenderId: "185221198755",
  appId: "1:185221198755:web:bb747731aaf4c1d4152016",
  measurementId: "G-H14L8JEE3X",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

import { Provider } from "react-redux";

//const store = createStore(rootReducer, applyMiddleware(thunk));

import LandingScreen from "./components/auth/Landing";
import RegisterScreen from "./components/auth/Register";
import LoginScreen from "./components/auth/Login";
import MainScreen from "./components/Main";
import RegisterSeller from "./components/auth/RegisterSeller";
import SellerFeed from "./components/main/Seller/SellerFeed";
import BuyerFeed from "./components/main/Buyer/Feed";
import SettingsPage from "./components/main/Buyer/Settings/SettingsPage";
import ProfileSettings from "./components/main/Buyer/Settings/Pages/ProfileSettings";
import { reduxStore } from "./redux";
import SetUpRestaurant from "./components/main/Seller/SetUpRestaurant";
import AddMenuItem from "./components/main/Seller/Menu/AddMenuItem";

const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }

  render() {
    const { loggedIn, loaded } = this.state;

    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ textAlign: "center" }}>Loading...</Text>
        </View>
      );
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="RegisterSeller" component={RegisterSeller} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <Provider store={reduxStore}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="SellerFeed" component={SellerFeed} />
            <Stack.Screen name="BuyerFeed" component={BuyerFeed} />
            <Stack.Screen name="Settings" component={SettingsPage} />
            <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
            <Stack.Screen name="RestaurantSetup" component={SetUpRestaurant} />
            <Stack.Screen name="AddMenuItem" component={AddMenuItem} />
            
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
