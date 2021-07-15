import React from 'react'
import firebase from 'firebase'

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function ProfileFalse() {
    return (
        <View>
            <Text>You're not a seller</Text>
            <TouchableOpacity onPress={() => firebase.auth().signOut()}>
                <Text style={styles.signOut}>
                    Sign out
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    signOut: {
        fontSize: 40,
        marginTop: 20
    }
  });