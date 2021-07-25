import React from "react";
import firebase from "firebase";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text>You're a seller</Text>
      <TouchableOpacity onPress={() => firebase.auth().signOut()}>
        <Text>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
});
