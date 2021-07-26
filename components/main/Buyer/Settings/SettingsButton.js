import React from "react";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";

export default function Settings({ currentUser }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.settings}
      onPress={() => navigation.navigate("Settings")}
    >
      <Text style={styles.name}>
        {currentUser.firstName} {currentUser.lastName}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 13,
    fontWeight: "600",
  },
  settings: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 30,
    borderRadius: 20,
    backgroundColor: "#3FD1D1",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    shadowColor: "#dbdbdb",
    shadowRadius: 6,
    shadowOpacity: 2,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
});
