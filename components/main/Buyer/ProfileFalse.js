import React, { useEffect } from "react";

import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Settings from "./Settings/SettingsButton";

import { useDispatch, useSelector } from "react-redux";
import { fetchUser, getUser } from "../../../redux/user";

export default function ProfileFalse() {
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

  if (!user) {
    return (
      <View>
        <Text style={{ marginTop: "20%" }}>Loading...</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.profile}>Your Profile</Text>
          <Settings currentUser={user}/>
        </View>
        <Text>You're not a seller</Text>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: "10%",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  signOut: {
    fontSize: 40,
    marginTop: 20,
    backgroundColor: "gray",
  },
  profile: {
    fontSize: 30,
    fontWeight: "800",
  },
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
  },
});
