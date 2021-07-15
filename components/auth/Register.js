import React, { Component } from 'react'

import { View, Button, TextInput, Text, StyleSheet } from 'react-native'

import { Checkbox } from 'react-native-paper';

import firebase from 'firebase'

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: '',
            isSeller: false
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const { email, password, name, isSeller } = this.state;

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                firebase.firestore()
                    .collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .set({
                        name,
                        email,
                        isSeller
                    })
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    componentDidMount() {
        console.log(this.state)
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder="name"
                    onChangeText={(name) => this.setState({ name })}
                />
                <TextInput
                    placeholder="email"
                    onChangeText={(email) => this.setState({ email })}
                />
                <TextInput
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                />
                <Text>Click below if you are seller</Text>
                <Checkbox
                    status={this.state.isSeller ? 'checked' : 'unchecked'}
                    onPress={() => this.setState({ isSeller: !this.state.isSeller })}
                />
                <Button
                    title="Sign Up"
                    onPress={() => { this.onSignUp() }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
  });