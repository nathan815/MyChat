import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { MessageBarManager } from 'react-native-message-bar';

import {
    View,
    SafeAreaView,
    StyleSheet,
    StatusBar,
    Keyboard,
} from 'react-native';
import { Form, Item, Input, Button, Text } from 'native-base';
import firebase from 'react-native-firebase';
import colors from '../styles/colors';

export default class RegisterScreen extends React.Component {
    static navigationOptions = {
        title: "Create Account",
        gesturesEnabled: false,
    };
    constructor(props) {
      super(props);
      this.inputs = {};
      this.state = {
        email: "",
        password: "",
        confirmPassword: "",
        isLoading: false,
      };
    }
    submit = () => {
      if(!this.state.email || !this.state.password || !this.state.confirmPassword) {
        return;
      }
      Keyboard.dismiss();
      if(this.state.password !== this.state.confirmPassword) {
        this.showErrorMessage("The entered passwords don't match.");
        return;
      }
      this.setState({ isLoading: true });
      firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
      .catch(err => {
          console.log(err);
          let message = "";
          switch(err.code) {
            case 'auth/invalid-email':
              message = "Email address format is invalid."
              break;
          }
          this.showErrorMessage(message || err.message);
          this.setState({ isLoading: false })
      });
    }
    showErrorMessage(message) {
      MessageBarManager.showAlert({
        title: 'Unable to Create Account',
        message: message,
        alertType: 'error',
        position: 'bottom',
      });
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <Spinner visible={this.state.isLoading} textContent={"Creating account..."} textStyle={{color: '#FFF'}} />

                <Form style={styles.form}>
                  <Item>
                    <Input placeholder="Email Address"
                           textContentType="emailAddress"
                           keyboardType="email-address"
                           onChangeText={(email)=>this.setState({email:email.trim()})}
                           value={this.state.email} 
                           ref={(ref)=>this.inputs.email=ref}
                           blurOnSubmit={false}
                           onSubmitEditing={() => this.inputs.password._root.focus()}
                           returnKeyType={"next"} 
                           autoCapitalize="none" />
                  </Item>
                  <Item>
                    <Input secureTextEntry={true} 
                           textContentType="password"
                           placeholder="Password" 
                           onChangeText={(password)=>this.setState({password:password.trim()})}
                           value={this.state.password} 
                           ref={(ref)=>this.inputs.password=ref}
                           blurOnSubmit={false}
                           onSubmitEditing={() => this.inputs.confirmPassword._root.focus()}
                           returnKeyType="next" />
                  </Item>
                  <Item last>
                    <Input secureTextEntry={true} 
                           textContentType="password"
                           placeholder="Confirm Password" 
                           onChangeText={(password)=>this.setState({confirmPassword:password.trim()})}
                           value={this.state.confirmPassword} 
                           ref={(ref)=>this.inputs.confirmPassword=ref}
                           returnKeyType="done" />
                  </Item>

                  <Button block onPress={this.submit} style={styles.button}>
                    <Text>Create Account</Text>
                  </Button>
                </Form>

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10
    },
    button: {
      backgroundColor: colors.primary,
      margin: 15,
      marginTop: 30,
    }
});
