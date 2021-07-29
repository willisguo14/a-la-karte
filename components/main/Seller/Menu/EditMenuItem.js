import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import firebase from "firebase";

export default function EditMenuItem({ route, navigation }) {
  const { item } = route.params;
  const [itemName, setItemName] = useState(item.itemName);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price);

  const saveProfile = async () => {
    await firebase
      .firestore()
      .collection("restaurant")
      .doc(firebase.auth().currentUser?.uid)
      .collection("menu")
      .doc(item.id)
      .update({
        itemName: itemName,
        description: description,
        price: price,
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titles}>Item Name</Text>
      <TextInput
        defaultValue={item.itemName}
        placeholder="Name of the menu item"
        onChangeText={(itemName) => setItemName(itemName)}
        style={styles.input}
      />
      <Text style={styles.titles}>Description</Text>
      <TextInput
        defaultValue={item.description}
        multiline={true}
        placeholder="Description of item"
        onChangeText={(description) => setDescription(description)}
        style={styles.inputLong}
      />
      <Text style={styles.titles}>Price</Text>
      <TextInput
        defaultValue={item.price}
        placeholder="Price of item"
        onChangeText={(price) => setPrice(price)}
        style={styles.input}
      />
      <TouchableOpacity style={styles.save} onPress={saveProfile}>
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
  titles: {
    fontSize: 25,
    fontWeight: "600",
    marginBottom: "1%",
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
  inputLong: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1%",
    marginBottom: "3%",
    width: "100%",
    height: 112,
    borderRadius: 5,
    backgroundColor: "#C7C7C7",
    paddingLeft: 5,
  },
});
