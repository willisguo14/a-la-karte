import React, { useEffect, Component, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

import { connect, useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchRestaurant, getRestaurant } from "../../../redux/restaurant";
import { fetchUser, getUser } from "../../../redux/user";

export default function SellerFeed() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const restaurant = useSelector(getRestaurant);

  const handleFetchUser = async ({ navigation }) => {
    try {
      await fetchUser(dispatch);
    } catch (e) {
      Alert.alert("Oops", e.message);
    }
  };

  const handleFetchRestaurant = async () => {
    try {
      await fetchRestaurant(dispatch);
    } catch (e) {
      Alert.alert("Oops", e.message);
    }
  };

  useEffect(() => {
    handleFetchUser();
    handleFetchRestaurant();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Seller Feed</Text>
      <Text>Your Information</Text>
      <Text>{user?.firstName}</Text>
      <Text>{user?.address}</Text>
      <TouchableOpacity
        style={styles.setUp}
        onPress={() => navigation.navigate("RestaurantSetup")}
      >
        <Text>Set up your restaurant</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "20%",
  },
  setUp: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "3%",
    width: "100%",
    height: 40,
    borderRadius: 13,
    backgroundColor: "#3FD1D1",
  },
});
