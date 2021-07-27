import React, { useEffect } from "react";
import firebase from "firebase";

import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurant, getRestaurant } from "../../../redux/restaurant";

export default function Profile() {
  const dispatch = useDispatch();
  const restaurant = useSelector(getRestaurant);

  const handleFetchRestaurant = async () => {
    try {
      await fetchRestaurant(dispatch);
    } catch (e) {
      Alert.alert("Oops", e.message);
    }
  };

  useEffect(() => {
    handleFetchRestaurant();
  }, []);

  if (!restaurant) {
    return (
      <View>
        <Text style={{ marginTop: "20%" }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>{restaurant?.phoneNumber}</Text>
      <Text>You're a seller</Text>
      <TouchableOpacity onPress={() => firebase.auth().signOut()}>
        <Text>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "20%",
  },
});
