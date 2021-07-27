import React, { useEffect, Component, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { fetchUser, fetchRestaurant } from "../../../redux/actions/index";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

export class SellerFeed extends Component {
  componentDidMount() {
    this.props.fetchUser();
    //this.props.fetchRestaurant();
  }

  render() {
    const { currentUser } = this.props;
    
    //const { currentRestaurant } = this.props;
    //console.log(currentRestaurant);
    //console.log(currentUser);

    if (currentUser === undefined ) {
      console.log("currentUser is undefined");
      return (
        <View>
          <Text style={{ marginTop: "20%" }}>Loading...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text>Seller Feed</Text>
        <Text>Your Information</Text>
        <Text>{currentUser.firstName}</Text>
        <Text>{currentUser.address}</Text>
        {/* <Text>{currentRestaurant.restaurantName}</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: "20%",
  },
  setUp: {
    backgroundColor: "gray",
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  //currentRestaurant: store.restaurantState.currentRestaurant,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser}, dispatch);
//fetchRestaurant,
export default connect(mapStateToProps, mapDispatchProps)(SellerFeed);
