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

    if (currentUser === undefined ) {
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
        <Text>{currentUser.name}</Text>
        <Text>{currentUser.address}</Text>
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
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(SellerFeed);
