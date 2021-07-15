import React from "react";
import firebase from "firebase";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ProfileFalse() {
  return (
    <View style={styles.container}>
      <Text>You're not a seller</Text>
      <TouchableOpacity onPress={() => firebase.auth().signOut()}>
        <Text style={styles.signOut}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  signOut: {
    fontSize: 40,
    marginTop: 20,
    backgroundColor: "gray",
    //width: "50%"
  },
});
