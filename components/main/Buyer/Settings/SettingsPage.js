import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import firebase from "firebase";
import { fetchUser, getUser } from "../../../../redux/user";
import { useDispatch, useSelector } from "react-redux";

export default function SettingsPage({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector(getUser);

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
      <Text style={styles.name}>
        {user.firstName} {user.lastName}
      </Text>
      <TouchableOpacity
        style={styles.profile}
        onPress={() => navigation.navigate("ProfileSettings")}
      >
        <Text style={styles.profileText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.profile}
        // onPress={() => this.props.navigation.navigate("BuyerFeed")}
      >
        <Text style={styles.profileText}>Other</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.profile}
        // onPress={() => this.props.navigation.navigate("BuyerFeed")}
      >
        <Text style={styles.profileText}>Stuff</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signOut}
        onPress={() => firebase.auth().signOut()}
      >
        <Text style={styles.profileText}>Sign Out</Text>
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
  name: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: "15%",
  },
  profile: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "3%",
    width: "100%",
    height: 40,
    borderRadius: 13,
    backgroundColor: "#3FD1D1",
  },
  profileText: {
    fontSize: 20,
    fontWeight: "400",
  },
  signOut: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
    width: "100%",
    height: 40,
    borderRadius: 13,
    backgroundColor: "#FF5454",
  },
});
