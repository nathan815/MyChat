import React from 'react';

import {
  Alert,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  StyleSheet,
  StatusBar
} from 'react-native';
import colors from '../styles/colors';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('LoggedIn');
    },500);
  }

  render() {
    return (
<View style={styles.container}>
  <StatusBar
    backgroundColor={colors.primary}
    barStyle="light-content"
  />
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
  },
  loader: {

  }
});