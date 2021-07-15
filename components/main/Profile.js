import React from 'react'
import firebase from 'firebase'

import { View, Text, TouchableOpacity } from 'react-native'

export default function Profile() {
    return (
        <View>
            <Text>You're a seller</Text>
            <TouchableOpacity onPress={() => firebase.auth().signOut()}>
                <Text>
                    Sign out
                </Text>
            </TouchableOpacity>
        </View>
    )
}
