import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import firebase from "firebase";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../../../../redux/actions/index";

export class SettingsPage extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    const { currentUser } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.name}>
          {currentUser.firstName} {currentUser.lastName}
        </Text>
        <TouchableOpacity
          style={styles.profile}
          onPress={() => this.props.navigation.navigate("ProfileSettings")}
        >
          <Text style={styles.profileText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.profile}
          // onPress={() => this.props.navigation.navigate("BuyerFeed")}
        >
          <Text style={styles.profileText}>Other</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.profile}
          // onPress={() => this.props.navigation.navigate("BuyerFeed")}
        >
          <Text style={styles.profileText}>Stuff</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signOut}
          onPress={() => firebase.auth().signOut()}
        >
          <Text style={styles.profileText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    padding: "4%",
  },
  name: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: "15%",
  },
  profile: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "3%",
    width: "100%",
    height: 40,
    borderRadius: 13,
    backgroundColor: "#3FD1D1",
  },
  profileText: {
    fontSize: 20,
    fontWeight: "400",
  },
  signOut: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
    width: "100%",
    height: 40,
    borderRadius: 13,
    backgroundColor: "#FF5454",
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(SettingsPage);
