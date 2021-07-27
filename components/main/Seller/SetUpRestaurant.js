import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import firebase from "firebase";

export default function SetUpRestaurant({ navigation }) {
  const [restaurantName, setRestaurantName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSave = () => {
    firebase
      .firestore()
      .collection("restaurant")
      .doc(firebase.auth().currentUser.uid)
      .set({
        restaurantName: restaurantName,
        phoneNumber: phoneNumber,
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
    navigation.navigate("SellerFeed");
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Restaurant Name"
        onChangeText={(restaurantName) => setRestaurantName(restaurantName)}
        style={styles.input}
      />
      <TextInput
        placeholder="Phone Number"
        onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
        style={styles.input}
      />
      <TouchableOpacity style={styles.save} onPress={handleSave}>
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    padding: "4%",
  },
  save: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "7%",
    width: "100%",
    height: 40,
    borderRadius: 13,
    backgroundColor: "#24D134",
  },
  input: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1%",
    marginBottom: "3%",
    width: "100%",
    height: 25,
    borderRadius: 5,
    backgroundColor: "#C7C7C7",
    paddingLeft: 5,
  },
});
