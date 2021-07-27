import React, { Component } from "react";

import { View, Button, TextInput, Text, StyleSheet } from "react-native";

import firebase from "firebase";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      isSeller: false,
    };

    this.onSignUp = this.onSignUp.bind(this);
  }

  onSignUp() {
    const { email, password, firstName, lastName, isSeller } = this.state;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            firstName,
            lastName,
            email,
            isSeller,
          });
      })
      .catch((error) => {
        //console.log(error);
      });
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="First Name"
          onChangeText={(firstName) => this.setState({ firstName })}
        />
        <TextInput
          placeholder="Last Name"
          onChangeText={(lastName) => this.setState({ lastName })}
        />
        <TextInput
          placeholder="Email"
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />
        <Button
          title="Sign Up"
          onPress={() => {
            this.onSignUp();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
