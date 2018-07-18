import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import firebase from 'react-native-firebase';

import colors from './styles/colors';

export default class DrawerContent extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onUserChanged(this.onUserChanged);
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  onUserChanged = (currentUser) => {
    this.setState({
      user: currentUser
    });
  }

  render() {
    return (
        <React.Fragment>
          <SafeAreaView style={styles.header}>
              <View style={styles.headerContent}>
                <Text style={styles.headerTextMain}>{ this.state.user ? this.state.user.displayName : '' }</Text>
                <Text style={styles.headerTextSecondary}> { this.state.user ? this.state.user.email : '' }</Text>
              </View>
          </SafeAreaView>
          <ScrollView>
            <SafeAreaView style={styles.content}>
              <DrawerItems {...this.props} />
            </SafeAreaView>
          </ScrollView>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primaryDark,
    height: 150,
    justifyContent: 'flex-end'
  },
  headerContent: {
    padding: 15
  },
  headerTextMain: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff'
  },
  headerTextSecondary: {
    fontSize: 15,
    color: '#fff',
  },
  content: {
    flex: 1
  },
});
