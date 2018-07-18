import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import firebase from 'react-native-firebase';
import { MessageBar, MessageBarManager } from 'react-native-message-bar';

import { LoggedInNavigator, LoggedOutNavigator } from './router';
import LoadingScreen from './screens/LoadingScreen';

export default class App extends Component {

  constructor() {
      super();
      this.authUnsubscribe = null;
      this.state = {
        user: null,
        isLoading: true,
        loggedInScreenProps: {}
    };
  }

  componentDidMount() {
    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      this.setState({ 
        user,
        isLoading: false
      });
    });
    console.log("REFS",this.refs);
    //MessageBarManager.registerMessageBar(this.refs.alert);
  }

  componentWillUnmount() {
    if (this.authUnsubscribe) {
      this.authUnsubscribe();
    }
    MessageBarManager.unregisterMessageBar();
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingScreen />;
    }
    return (
      <React.Fragment>
        <StatusBar translucent barStyle="light-content" backgroundColor="rgba(0,0,0,0.3)" />
        {this.state.user ? <LoggedInNavigator screenProps={this.state.loggedInScreenProps} /> : <LoggedOutNavigator />}
        <MessageBar ref={(ref) => MessageBarManager.registerMessageBar(ref)} />
      </React.Fragment>
    );
  }

}
