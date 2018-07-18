import React from 'react';

import { Text,  View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { Fab, Icon } from 'native-base';
import firebase from 'react-native-firebase';

import ConversationListItem from "./ConversationListItem";
import colors from '../../styles/colors';

export default class ConversationListScreen extends React.Component {
  static navigationOptions = {
    title: "My Conversations"
  };
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.conversationsRef = firebase.firestore().collection('conversations');
    this.state = {
      conversations: {},
      isLoading: true
    };
  }

  componentDidMount() {
    this.listenForConversations();
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.conversationsRef = null;
  }

  listenForConversations = () => {
    const user = firebase.auth().currentUser;
    this.unsubscribe = this.conversationsRef.where("users." + user.uid, '=', true).orderBy('updatedOn', 'desc').onSnapshot(this.addConversationsToList);
  };

  addConversationsToList = (querySnapshot) => {
    const conversations = [];
    querySnapshot.forEach(document => {
      const conversation = document.data();
      conversations[conversation.conversationId] = conversation;
    });
    console.log(conversations);
    this.setState((prevState, props) => {
      return {
        conversations: Object.assign(prevState.conversations, conversations),
        isLoading: false
      }
    });
  };

  goToConversation = (conversation) => {
    this.props.navigation.push('Conversation', { conversation });
  };

  newConversation() {

  }

  renderItem(conversation) {
    return <ConversationListItem conversation={conversation} onClick={() => this.goToConversation(conversation)} />;
  }

  render() {
    if(this.state.isLoading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading conversations...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList data={Object.values(this.state.conversations)}
                  renderItem={({item}) => this.renderItem(item)}
                  keyExtractor={(item, index) => item.conversationId} />

        <Fab
          direction="up"
          containerStyle={{ }}
          style={styles.fab}
          position="bottomRight"
          onPress={() => this.newConversation()}>
          <Icon name="add" />
        </Fab>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingText: {
    color: colors.primary
  },
  fab: {
    backgroundColor: colors.primary,
  }
});
