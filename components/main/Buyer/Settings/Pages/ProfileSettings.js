import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../../../../../redux/actions/index";
import firebase from "firebase";

export class ProfileSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
    };
  }
  componentDidMount() {
    this.props.fetchUser();
  }
  componentWillReceiveProps() {
    const { currentUser } = this.props;
    this.setState({
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
    });
  }

  render() {
    const { currentUser } = this.props;
    const saveProfile = async () => {
      await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser?.uid)
        .update({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
          //setErrorMessage("Error updating document: ", error);
        });
      this.props.navigation.navigate("Settings");
    };
    return (
      <View style={styles.container}>
        <Text style={styles.titles}>First Name</Text>
        <TextInput
          defaultValue={currentUser.firstName}
          placeholder="John"
          onChangeText={(firstName) => this.setState({ firstName })}
          style={styles.input}
          //value={this.state.firstName}
        />
        <Text style={styles.titles}>Last Name</Text>
        <TextInput
          defaultValue={currentUser.lastName}
          placeholder="Smith"
          onChangeText={(lastName) => this.setState({ lastName })}
          style={styles.input}
          //value={this.state.lastName}
        />
        <TouchableOpacity style={styles.save} onPress={saveProfile}>
          <Text>Save</Text>
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
  titles: {
    fontSize: 25,
    fontWeight: "600",
    marginBottom: "1%",
  },
  save: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "7%",
    width: "100%",
    height: 40,
    borderRadius: 13,
    backgroundColor: "#24D134",
  },
  input: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1%",
    marginBottom: "3%",
    width: "100%",
    height: 25,
    borderRadius: 5,
    backgroundColor: "#C7C7C7",
    paddingLeft: 5,
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(ProfileSettings);
