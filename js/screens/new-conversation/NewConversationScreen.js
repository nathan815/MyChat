import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { MessageBarManager } from 'react-native-message-bar';
import {
  Alert,
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Keyboard,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Form, Item, Input, Button, Text } from 'native-base';
import colors from '../../styles/colors';
import ConversationUserSelector from './ConversationUserSelector';
import firebase from 'react-native-firebase';

export default class NewConversationScreen extends React.Component {
  static navigationOptions = {
    title: "New Conversation",
    gesturesEnabled: false,
  };
  constructor(props) {
    super(props);
    this.inputs = {};
    this.state = {
      name: "",
      selectedUsers: [],
      isLoading: false,
    };
  }
  submit = () => {
    if(!this.state.name || this.state.selectedUsers.length === 0) {
      return;
    }
    //this.setState({ isLoading: true });
    Keyboard.dismiss();
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    const myUserId = firebase.auth().currentUser.uid;
    const userIds = Object.keys(this.state.selectedUsers);
    const users = {};
    userIds.forEach((id) => {
      users[id] = true;
    });
    users[myUserId] = true;
    console.log(users);
    firebase.firestore().collection('conversations').add({
      name: this.state.name,
      users: users,
      createdOn: new Date(),
      updatedOn: new Date(),
      latestMessage: null,
      color: '#' + randomColor,
    }).then(() => {
      this.setState({
        isLoading: false
      });
      this.props.navigation.goBack();
    })
  };
  setSelectedUsers = (users) => {
    this.setState({
      selectedUsers: users
    });
  };
  showErrorMessage(message) {
    MessageBarManager.showAlert({
      title: 'An Error Occurred',
      message: message,
      alertType: 'error',
      position: 'bottom',
    });
  }
  render() {
    const content = (
      <React.Fragment>
        <Spinner visible={this.state.isLoading} textContent={"Creating..."} textStyle={{color: '#FFF'}} />
        <Form style={styles.form}>
          <Item>
            <Input placeholder="Conversation Name"
                   onChangeText={(name)=>this.setState({name:name.trim()})}
                   value={this.state.name} />
          </Item>
        </Form>
        <ConversationUserSelector style={styles.userSelector} onUserListChange={(users)=>this.setSelectedUsers(users)}/>
        <Button block onPress={this.submit} style={styles.button}>
          <Text>Start Conversation</Text>
        </Button>
      </React.Fragment>
    );
    return Platform.select({
      ios: (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={75}  style={styles.container}>
          {content}
        </KeyboardAvoidingView>
      ),
      android: (
        <View style={styles.container}>
          {content}
        </View>
      )
    });
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
  },
  userSelectorTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  userSelector: {
    flex: 1,
    marginTop: 15
  }
});
