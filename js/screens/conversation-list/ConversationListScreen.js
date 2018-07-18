import React from 'react';

import { Text, View, FlatList, StatusBar, StyleSheet } from 'react-native';
import ConversationScreen from "../conversation/ConversationScreen";
import ConversationListItem from "./ConversationListItem";
import colors from "../../styles/colors";

import firebase from 'react-native-firebase';

export default class ConversationListScreen extends React.Component {
  static navigationOptions = {
    title: "Conversations",
    drawerLabel: "Conversations"
  };
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      conversations: {}
    };
  }

  componentDidMount() {
    this.unsubscribe = firebase.firestore().collection('conversations').orderBy('updatedOn', 'desc').onSnapshot((querySnapshot) => {
      const conversations = [];
      querySnapshot.forEach(document => {
        const conversation = document.data();
        conversations[conversation.conversationId] = conversation;
      });
      console.log(conversations);
      this.setState((prevState, props) => {
        return {
          conversations: Object.assign(prevState.conversations, conversations)
        }
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  goToConversation = (conversation) => {
    this.props.navigation.push('Conversation', { conversation });
  }

  renderItem(conversation) {
    return <ConversationListItem conversation={conversation} onClick={() => this.goToConversation(conversation)} />;
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList data={Object.values(this.state.conversations)}
                  renderItem={({item}) => this.renderItem(item)}
                  keyExtractor={(item, index) => item.conversationId} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
