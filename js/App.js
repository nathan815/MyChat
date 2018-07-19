import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import firebase from 'react-native-firebase';
import { MessageBar, MessageBarManager } from 'react-native-message-bar';

import { LoggedInNavigator, LoggedOutNavigator } from './navigation';
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
        isLoading: false,
      });
    });
  }

  componentWillUnmount() {
    if (this.authUnsubscribe) {
      this.authUnsubscribe();
    }
    MessageBarManager.unregisterMessageBar();
  }

  render() {
    if(this.state.isLoading) {
      return <LoadingScreen />;
    }
    return (
      <React.Fragment>
        <StatusBar translucent
                   barStyle="light-content"
                   backgroundColor="rgba(0,0,0,0.3)" />

        { this.state.user ? <LoggedInNavigator /> : <LoggedOutNavigator /> }

        <MessageBar ref={(ref) => MessageBarManager.registerMessageBar(ref)}
                    viewTopInset={15} />
      </React.Fragment>
    );
  }

}
