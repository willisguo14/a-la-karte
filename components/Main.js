import React, { Component, useEffect } from "react";

import { View, Text, Alert } from "react-native";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { connect, useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import FeedScreen from "./main/Buyer/Feed";
import FeedScreenSeller from "./main/Seller/SellerFeed";
import ProfileScreen from "./main/Seller/Profile";
import ProfileFalseScreen from "./main/Buyer/ProfileFalse";

const Tab = createMaterialBottomTabNavigator();

import { fetchUser, getUser } from "../redux/user";

export default function Main() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const handleFetchUser = async () => {
    try {
      await fetchUser(dispatch);
    } catch (e) {
      Alert.alert("Oops", e.message);
    }
  };

  useEffect(() => {
    handleFetchUser();
  }, []);

  if (!user) {
    return (
      <View>
        <Text style={{ marginTop: "20%" }}>Loading...</Text>
      </View>
    );
  }

  return (
    <Tab.Navigator initialRouteName="Feed" labeled={false}>
      <Tab.Screen
        name="Feed"
        component={user?.isSeller ? FeedScreenSeller : FeedScreen}
        //component={FeedScreenSeller}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={user?.isSeller ? ProfileScreen : ProfileFalseScreen}
        //component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}