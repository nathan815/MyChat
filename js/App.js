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
    const navigator = this.state.user ? <LoggedInNavigator /> : <LoggedOutNavigator />;
    return (
      <React.Fragment>
        <StatusBar translucent barStyle="light-content" backgroundColor="rgba(0,0,0,0.3)" />
        { navigator }
        <MessageBar ref={(ref) => MessageBarManager.registerMessageBar(ref)} />
      </React.Fragment>
    );
  }

}
