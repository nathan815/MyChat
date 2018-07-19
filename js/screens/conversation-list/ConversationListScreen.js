import React from 'react';

import { Alert, Text,  View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { Fab, Icon } from 'native-base';
import firebase from 'react-native-firebase';

import ConversationListItem from "./ConversationListItem";
import colors from '../../styles/colors';
import Loading from "../../common/Loading";

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
    console.log('listening',user);
    this.unsubscribe = this.conversationsRef.where(`users.${user.uid}`, '==', true).onSnapshot(this.handleConversationListUpdate);
  };

  loadConversations = () => {
    this.conversationsRef.where(`users.${user.uid}`, '=', true).get()
    .then(this.handleConversationListUpdate)
    .catch((err) => alert(err));
  };

  handleConversationListUpdate = (querySnapshot) => {
    console.log('snapshot',querySnapshot);
    const conversations = [];
    querySnapshot.forEach(document => {
      conversations[document.id] = document.data();
    });
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

  askToDeleteConversation = (conversation) => {
    Alert.alert(
      'Delete Conversation',
      `Do you really want to delete "${conversation.name}"?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => this.deleteConversation(conversation) },
      ],
      { cancelable: false }
    );
  };

  deleteConversation = (conversation) => {
    alert('deleted conversation');
  };

  newConversation() {
    this.props.navigation.navigate('NewConversation');
  }

  renderItem(conversation) {
    return <ConversationListItem conversation={conversation} 
                                 onPress={() => this.goToConversation(conversation)} 
                                 onLongPress={() => this.askToDeleteConversation(conversation)} />;
  }

  render() {
    if(this.state.isLoading) {
      return <Loading loadingText="Loading conversations..." />;
    }

    return (
      <View style={styles.container}>
        <FlatList data={Object.values(this.state.conversations)}
                  renderItem={({item}) => this.renderItem(item)}
                  keyExtractor={(item, index) => index.toString()} />

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
  fab: {
    backgroundColor: colors.primary,
  }
});
