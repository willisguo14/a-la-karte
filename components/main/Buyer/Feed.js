import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableHighlight,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurant, getRestaurant } from "../../../redux/restaurant";
import firebase from "firebase";
import { FlatList } from "react-native-gesture-handler";

export default function Feed() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("restaurant")
      .onSnapshot((snapshot) => {
        setRestaurants(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  const renderItem = ({ item, index }) => (
    <TouchableHighlight underlayColor="#A3A3A3" onPress={() => null}>
      <View
        style={{
          ...styles.containerListRow,
          ...(index !== 0 && styles.borderList),
        }}
      >
        <Text>{item.restaurantName}</Text>
        <Text>Phone number: {item.phoneNumber}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View style={styles.container}>
      <Text>Buyer Feed</Text>
      <Text>Restaurants:</Text>
      <FlatList
        data={restaurants}
        renderItem={renderItem}
        key={(item) => item.id}
        style={styles.containerList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "20%",
    padding: "5%"
  },
  containerList: {
    shadowRadius: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginTop: 20,
    overflow: "hidden",
  },
  containerListRow: {
    padding: 10,
    backgroundColor: "#FFFFFF",
  },
  borderList: {
    borderTopColor: "#DEDEDE",
    borderTopWidth: 2,
  },
});
