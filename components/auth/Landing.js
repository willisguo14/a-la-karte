import React, { useState } from "react";
import { Text, View, Button, Modal, StyleSheet } from "react-native";

export default function Landing({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  
  const handleSeller = () => {
    navigation.navigate("RegisterSeller");
    setModalVisible(false);
  }
  
  const handleBuyer = () => {
    navigation.navigate("Register");
    setModalVisible(false);
  }
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
      <Modal
        animationType="slide"
        visible={modalVisible}
      >
        <View style={styles.modal}>
          <Button title="Register as a Seller" onPress={handleSeller}></Button>
          <Button title="Register as a Buyer" onPress={handleBuyer}></Button>
          <Button title="Close" onPress={() => setModalVisible(false)}></Button>
        </View>
      </Modal>
      <Button
        title="Register"
        onPress={() => setModalVisible(true)}
      />
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
    </View>
  );
}
const styles = StyleSheet.create({
  modal: {
    marginTop: "20%"
  }
})
