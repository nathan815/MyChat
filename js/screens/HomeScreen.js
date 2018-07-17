import React from 'react';

import {
  Text,
  View,
  StyleSheet,
  StatusBar
} from 'react-native';

import BaseButton from '../components/BaseButton';
import colors from '../styles/colors';

function Button(props) {
  return <BaseButton color="#fff" androidTextColor={colors.primary} {...props} />;
}

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  goToLogin = () => this.props.navigation.navigate('Login');
  goToRegister = () => this.props.navigation.navigate('Register');
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={colors.primary}
          barStyle="light-content"
        />
        <Text style={styles.headerText}>Welcome to MyChat!</Text>
        <View style={styles.buttonContainer}>
          <Button onPress={this.goToLogin} title="Sign In" />
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={this.goToRegister} title="Create an Account" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: colors.primary,
  },
  headerText:{
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 50,
    color: '#fff',
  },
  buttonContainer: {
    marginBottom: 20,
    width: '70%',
    alignSelf: 'center'
  }
});
