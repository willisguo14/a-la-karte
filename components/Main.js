import React, { Component } from "react";

import { View, Text } from "react-native";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser, fetchRestaurant } from "../redux/actions/index";

import FeedScreen from "./main/Buyer/Feed";
import FeedScreenSeller from "./main/Seller/SellerFeed";
import ProfileScreen from "./main/Seller/Profile";
import ProfileFalseScreen from "./main/Buyer/ProfileFalse";

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
  return null;
};

export class Main extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchRestaurant();
  }

  render() {
    const { currentUser } = this.props;
    //const { currentRestaurant } = this.props;

    if (currentUser === undefined) {
      return <View></View>;
    }

    return (
      <Tab.Navigator initialRouteName="Feed" labeled={false}>
        <Tab.Screen
          name="Feed"
          component={currentUser.isSeller ? FeedScreenSeller : FeedScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={currentUser.isSeller ? ProfileScreen : ProfileFalseScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account-circle"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  currentRestaurant: store.restaurantState.currentRestaurant,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser, fetchRestaurant }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);
