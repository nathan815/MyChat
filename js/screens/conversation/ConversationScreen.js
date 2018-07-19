import React from 'react';
import firebase from 'react-native-firebase';

import {
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import ReversedFlatList from 'react-native-reversed-flat-list';
import { Button, Icon } from 'native-base';

import Loading from "../../common/Loading";
import colors from "../../styles/colors";
import MessageItem from './MessageItem';

export default class ConversationScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params ? navigation.state.params.title : "Conversation"}`,
  })
  constructor() {
    super();
    this.unsubscribe = null;
    this.conversation = null;
    this.state = {
      messages: {},
      isLoading: true,
    };
  }
  componentDidMount() {
    this.conversation = this.props.navigation.getParam('conversation', {});
    this.props.navigation.setParams({ title: this.conversation.name });
    this.messagesRef = firebase.firestore().collection('conversations').doc(this.conversation.conversationId).collection('messages');
    this.loadMessages();
  }
  componentWillUnmount() {
    if(this.unsubscribe) {
      this.unsubscribe();
    }
  }
  loadMessages() {
    this.messagesRef.orderBy('sentOn', 'asc').get().then(this.handleMessageUpdate).then(this.listenForMessages);
  }
  listenForMessages = () => {
    this.unsubscribe = this.messagesRef.orderBy('sentOn', 'asc').onSnapshot(this.handleMessageUpdate);
  };
  handleMessageUpdate = (querySnapshot) => {
    const messages = {};
    querySnapshot.forEach(document => {
      messages[document.id] = document.data();
      messages[document.id].id = document.id;
    });
    this.setState((prevState, props) => {
      console.log("setState");
      return {
        messages: Object.assign(prevState.messages, messages),
        isLoading: false
      }
    });
    return Promise.resolve();
  };
  render() {
    if(this.state.isLoading) {
      return <Loading loadingText="Loading messages..." />;
    }

    const sendButton = Platform.select({ 
      android: <Icon name="send" style={styles.sendButtonIcon} />,
      ios: <Text style={styles.sendButtonText}>Send</Text>
    });

    return (
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={75} style={styles.container}>

        <ReversedFlatList data={Object.values(this.state.messages)}
                          renderItem={({item}) => <MessageItem message={item} />}
                          keyExtractor={(item, index) => item.id}
                          style={styles.list} />

        <View style={styles.formContainer}>
          <TextInput placeholder="Send a message..." 
                     style={styles.input} 
                     underlineColorAndroid={colors.primary} 
                     tintColor={colors.primary} />
          <TouchableOpacity onPress={()=>{}} style={styles.sendButton}>
            { sendButton }
          </TouchableOpacity>
        </View>
        
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    paddingVertical: 10,
  },
  sendButton: {
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary
  },
  sendButtonIcon: {
    fontSize: 35,
    color: colors.primary
  }
});
