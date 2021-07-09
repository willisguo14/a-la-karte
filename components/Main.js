import React, { Component } from 'react'

import { View, Text } from 'react-native';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { fetchUser } from '../redux/actions/index'

import FeedScreen from './main/Feed'
import ProfileScreen from './main/Profile'
import ProfileFalseScreen from './main/ProfileFalse'

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
    return null
}

export class Main extends Component {
    componentDidMount() {
        this.props.fetchUser();
        console.log(this.props)
    }

    render() {

        const { currentUser } = this.props;

        if (currentUser === undefined) {
            return <View></View>
        }

        return (
            <Tab.Navigator initialRouteName="Feed" labeled={false}>
                <Tab.Screen
                    name="Feed"
                    component={FeedScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={26} />
                        )
                    }}
                />
                {/* <Tab.Screen
                    name="AddContainer"
                    component={EmptyScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="plus-box" color={color} size={26} />
                        )
                    }}
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            event.preventDefault();
                            navigation.navigate("Add")
                        }
                    })}
                /> */}
                <Tab.Screen
                    name="Profile"
                    component={currentUser.isSeller ? ProfileScreen : ProfileFalseScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="account-circle" color={color} size={26} />
                        )
                    }}
                />
            </Tab.Navigator>
        )
    }
}



const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);
