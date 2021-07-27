import React, { Component, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import firebase from "firebase";
import { fetchUser, getUser } from "../../../../../redux/user";

export default function ProfileSettings() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const saveProfile = async () => {
    await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser?.uid)
      .update({
        firstName: firstName,
        lastName: lastName,
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
        //setErrorMessage("Error updating document: ", error);
      });
    this.props.navigation.navigate("Settings");
  };

  const handleFetchUser = async () => {
    try {
      await fetchUser(dispatch);
    } catch (e) {
      Alert.alert("Oops", e.message);
    }
  };

  useEffect(() => {
    handleFetchUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titles}>First Name</Text>
      <TextInput
        defaultValue={user.firstName}
        placeholder="John"
        onChangeText={(firstName) => setFirstName(firstName)}
        style={styles.input}
      />
      <Text style={styles.titles}>Last Name</Text>
      <TextInput
        defaultValue={user.lastName}
        placeholder="Smith"
        onChangeText={(lastName) => setLastName(lastName)}
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
});
