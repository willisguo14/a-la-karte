import React from "react";

import { View, Text, StyleSheet } from "react-native";

export default function Feed() {
  return (
    <View style={styles.container}>
      <Text>Buyer Feed</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "20%",
  },
});
