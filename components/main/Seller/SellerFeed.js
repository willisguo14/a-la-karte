import React, { useEffect, Component, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { fetchUser } from "../../../redux/actions/index";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

export class SellerFeed extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const { currentUser } = this.props;

    if (currentUser === undefined) {
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
        <TouchableOpacity
          style={styles.setUp}
          onPress={() => this.props.navigation.navigate("RestaurantSetup")}
        >
          <Text>Set up your restaurant</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: "20%",
  },
  setUp: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "3%",
    width: "100%",
    height: 40,
    borderRadius: 13,
    backgroundColor: "#3FD1D1",
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(SellerFeed);
