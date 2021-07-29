import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
} from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function MenuFeed({ item, index }) {
  
  const handleEdit = () => {
    navigation.navigate('EditMenuItem', {
      id: item.id,
    });
  };

  return (
    <TouchableHighlight underlayColor="#A3A3A3" onPress={handleEdit}>
      <View style={{ ...styles.container, ...(index !== 0 && styles.border) }}>
        <Text>Name: {item.itemName}</Text>
        <Text>Description: {item.description}</Text>
        <Text>Price: {item.price}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#FFFFFF",
  },
  border: {
    borderTopColor: "#DEDEDE",
    borderTopWidth: 2,
  },
});
