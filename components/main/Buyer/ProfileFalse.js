import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../../../redux/actions/index";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Settings from "./Settings/SettingsButton";

export class ProfileFalse extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    const { currentUser } = this.props;
    
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.profile}>Your Profile</Text>
          <Settings currentUser={currentUser}/>
        </View>
        <Text>You're not a seller</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: "10%",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  signOut: {
    fontSize: 40,
    marginTop: 20,
    backgroundColor: "gray",
  },
  profile: {
    fontSize: 30,
    fontWeight: "800",
  },
  name: {
    fontSize: 13,
    fontWeight: "600",
  },
  settings: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 30,
    borderRadius: 20,
    backgroundColor: "#3FD1D1",
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(ProfileFalse);
