import React, { useState } from "react";
import {
  Text,
  View,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import logo from "../../assets/logo.jpeg";

export default function Landing({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSeller = () => {
    navigation.navigate("RegisterSeller");
    setModalVisible(false);
  };

  const handleBuyer = () => {
    navigation.navigate("Register");
    setModalVisible(false);
  };
  return (
    <LinearGradient
      colors={["#ef475b", "#d169cb", "59a3ee"]}
      style={styles.background}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.container}>
        <Modal animationType="slide" visible={modalVisible}>
          <View style={styles.modal}>
            <Button
              title="Register as a Seller"
              onPress={handleSeller}
            ></Button>
            <Button title="Register as a Buyer" onPress={handleBuyer}></Button>
            <Button
              title="Close"
              onPress={() => setModalVisible(false)}
            ></Button>
          </View>
        </Modal>
        <View style={styles.logo}>
          <Image style={styles.image} source={logo} />
        </View>
        <Text style={styles.name}>A la Carte</Text>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.login}
            onPress={() => navigation.navigate("Login")}
          >
            <Text>Login</Text>
          </TouchableOpacity>
          {/* <View style={{height: 3, alignSelf: 'stretch', backgroundColor: '#dddddd'}}/> */}
          <Text style={styles.or}>Or</Text>
          <TouchableOpacity
            style={styles.register}
            onPress={() => setModalVisible(true)}
          >
            <Text style={{ color: "#FFFFFF" }}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: "20%",
    alignItems: "center",
  },
  background: {
    flex: 1,
  },
  register: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "7%",
    width: "100%",
    height: 40,
    borderRadius: 13,
    backgroundColor: "transparent",
    borderColor: "#FFFFFF",
    borderWidth: 1.5,
  },
  login: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "7%",
    width: "100%",
    height: 40,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
  },
  modal: {
    marginTop: "20%",
  },
  bottomContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50%",
    width: "100%",
    padding: "5%",
  },
  or: {
    color: "#FFFFFF",
    marginTop: "7%",
    fontSize: 14
  },
  logo: {
    shadowColor: "#6B6B6B",
    shadowRadius: 14,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 20 },
    elevation: 1,
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 55,
  },
  name: {
    color: "#FFFFFF",
    marginTop: "5%",
    fontSize: 40,
    letterSpacing: 2
  },
});
