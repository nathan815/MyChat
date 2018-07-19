import React from 'react';

import {
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import colors from '../styles/colors';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#fff" size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
  }
});
