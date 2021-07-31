import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TouchableHighlight,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurant, getRestaurant } from "../../../redux/restaurant";
import { fetchUser, getUser } from "../../../redux/user";
import firebase from "firebase";
import MenuFeed from "./Menu/MenuFeed";
import { SwipeListView } from "react-native-swipe-list-view";

export default function SellerFeed({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const restaurant = useSelector(getRestaurant);
  const [menuItems, setMenuItems] = useState([]);

  const handleFetchUser = async () => {
    try {
      await fetchUser(dispatch);
    } catch (e) {
      Alert.alert("Oops", e.message);
    }
  };

  const handleFetchRestaurant = async () => {
    try {
      await fetchRestaurant(dispatch);
    } catch (e) {
      Alert.alert("Oops", e.message);
    }
  };

  useEffect(() => {
    handleFetchUser();
    handleFetchRestaurant();

    firebase
      .firestore()
      .collection("restaurant")
      .doc(firebase.auth().currentUser.uid)
      .collection("menu")
      .orderBy("order", "desc")
      .onSnapshot((snapshot) => {
        setMenuItems(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  const handleDelete = (item) => {
    Alert.alert(
      "Warning",
      `Are you sure you want to delete this menu item? This cannot be undone.`,
      [
        {
          text: "Cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await firebase
                .firestore()
                .collection("restaurant")
                .doc(firebase.auth().currentUser?.uid)
                .collection("menu")
                .doc(item.id)
                .delete()
                .then(() => {
                  console.log("Document successfully deleted!");
                })
                .catch((error) => {
                  console.error("Error removing document: ", error);
                });
            } catch (e) {
              Alert.alert("Oops", e.message);
            }
          },
        },
      ]
    );
  };

  if (!user) {
    return (
      <View>
        <Text style={{ marginTop: "20%" }}>Loading...</Text>
      </View>
    );
  }

  const renderItem = ({ item, index }) => (
    <TouchableHighlight
      underlayColor="#A3A3A3"
      onPress={() =>
        navigation.navigate("EditMenuItem", {
          item: item,
        })
      }
    >
      <View
        style={{
          ...styles.containerListRow,
          ...(index !== 0 && styles.borderList),
        }}
      >
        <Text>Name: {item.itemName}</Text>
        <Text>Description: {item.description}</Text>
        <Text>Price: {item.price}</Text>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (parentItem) => (
    <TouchableOpacity
      style={styles.swipeContainer}
      onPress={() => handleDelete(parentItem.item)}
    >
      <Text>Delete</Text>
    </TouchableOpacity>
  );

  const hasRestaurant = (
    <View>
      <View style={styles.header}>
        <Text style={styles.restaurant}>{restaurant?.restaurantName}</Text>
        <View style={styles.subHeader}>
          <Text style={styles.menu}>Your Menu</Text>
          <TouchableOpacity
            style={styles.setUp2}
            onPress={() => navigation.navigate("AddMenuItem")}
          >
            <Text>Add a Menu Item</Text>
          </TouchableOpacity>
        </View>
      </View>
      {menuItems.length ? (
        <SwipeListView
          data={menuItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.containerList}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-90}
          leftOpenValue={0}
          disableRightSwipe={true}
        />
      ) : (
        <Text style={styles.noMenu}>You have no menu items.</Text>
      )}
    </View>
  );

  const noRestaurant = (
    <View style={styles.noRestaurant}>
      <TouchableOpacity
        style={styles.setUp}
        onPress={() => navigation.navigate("RestaurantSetup")}
      >
        <Text>Set up your restaurant to continue!</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {user?.hasRestaurant ? hasRestaurant : noRestaurant}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: "10%",
  },
  containerList: {
    shadowRadius: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginTop: 20,
    overflow: "hidden",
  },
  setUp: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "3%",
    width: "100%",
    height: 40,
    borderRadius: 13,
    backgroundColor: "#3FD1D1",
  },
  setUp2: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "3%",
    width: "45%",
    height: 40,
    borderRadius: 13,
    backgroundColor: "#3FD1D1",
  },
  noRestaurant: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    marginTop: "1%",
  },
  subHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  restaurant: {
    fontSize: 30,
    fontWeight: "800",
  },
  menu: {
    marginTop: "1.5%",
    fontSize: 25,
    fontWeight: "600",
  },
  noMenu: {
    marginTop: "5.5%",
    fontSize: 15,
    fontWeight: "500",
  },
  swipeContainer: {
    height: "100%",
    paddingRight: "7.6%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#FF1717",
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
