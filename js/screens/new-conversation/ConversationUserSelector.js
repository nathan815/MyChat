import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { MessageBarManager } from 'react-native-message-bar';
import {
  Alert,
  ScrollView,
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Keyboard,
  Platform
} from 'react-native';
import { Form, Item, Input, Button, Text, List, ListItem, Icon, Left, Right } from 'native-base';
import firebase from 'react-native-firebase';
import colors from '../../styles/colors';

export default class ConversationUserSelector extends React.Component {
  constructor(props) {
    super(props);
    this.inputs = {};
    this.state = {
      isLoading: false,
      isAddingUser: false,
      enteredName: "",
      users: {}
    };
  }
  submit = () => {
    this.props.navigation.goBack();
    if(!this.state.name || this.state.selectedUsers.length === 0) {
      return;
    }
    this.setState({ isLoading: true });
    Keyboard.dismiss();

  };
  addUser = () => {
    if(this.state.enteredName.length === 0)
      return;
    this.setState({ isAddingUser: true });
    console.log('adding')

    firebase.firestore().collection('users').where('username', '==', this.state.enteredName).get().then((querySnapshot) => {
      const users = {};
      querySnapshot.forEach((document) => {
        users[document.id] = document.data();
      });
      if(Object.keys(users).length > 0) {
        this.setState((prevState) => {
          return {
            users: {...prevState.users, ...users},
            enteredName: ""
          };
        });
        this.props.onUserListChange(this.state.users);
      }
      else {
        this.showErrorMessage("User not found");
      }
      this.setState({ isAddingUser: false });
    }).catch((err) => {
      this.showErrorMessage(err);
      this.setState({ isAddingUser: false });
    });

  };
  removeUser = (id) => {
    const users = Object.assign({}, this.state.users);
    delete users[id];
    this.setState({ users });
    this.props.onUserListChange(this.state.users);
  };
  showErrorMessage(message) {
    MessageBarManager.showAlert({
      title: 'An Error Occurred',
      message: message,
      alertType: 'error',
      position: Platform.OS === 'ios' ? 'top' : 'bottom',
    });
  }
  renderUserList() {
    const users = [];
    for(let id in this.state.users) {
      const user = this.state.users[id];
      users.push(
        <ListItem style={styles.userRow} key={id}>
          <Left>
            <Text>{user.username}</Text>
          </Left>
          <Right>
            <Button small danger onPress={()=>this.removeUser(id)}><Icon name="trash" ios="ios-close" /></Button>
          </Right>
        </ListItem>
      );
    }
    users.reverse();
    return (
      <ScrollView style={styles.userList}>
        <List>{users}</List>
      </ScrollView>
    )
  }
  render() {
    return (
      <View style={[styles.container, this.props.style]}>

        <Form style={styles.form}>
          <Item>
            <Input border rounded placeholder="Enter a Username..."
                   onChangeText={(name)=>this.setState({ enteredName: name })}
                   value={this.state.enteredName}
                   style={styles.input} autoCapitalize="none" />
            <Button disabled={this.state.isAddingUser} style={styles.addButton} onPress={this.addUser}>
               <Text>Add</Text>
            </Button>
          </Item>

          { this.renderUserList() }

        </Form>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  submitButton: {
    backgroundColor: colors.primary,
    margin: 15,
    marginTop: 30,
  },
  form: {
    flex: 1,
  },
  input: {
    flex: 1
  },
  addButton: {
    backgroundColor: colors.primary,
  },
  removeButton: {
    alignSelf: 'flex-end'
  },
  userList: {
    flex: 1
  },
  userRow: {
    flex: 1
  }
});
