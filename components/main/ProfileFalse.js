import React from "react";
import firebase from "firebase";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ProfileFalse() {
  return (
    <View style={styles.container}>
      <Text>You're not a seller</Text>
      <TouchableOpacity onPress={() => firebase.auth().signOut()}>
        <Text>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40
  },
  
});
