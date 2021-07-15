import React from "react";
import { Text, View, Button } from "react-native";

export default function Landing({ navigation }) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: "20%",
        alignItems: "center",
      }}
    >
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
    </View>
  );
}
