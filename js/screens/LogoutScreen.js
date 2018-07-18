import React from 'react';
import firebase from 'react-native-firebase';

export default class LogoutScreen extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    firebase.auth().signOut();
  }
  render() {
    return null;
  }
}
