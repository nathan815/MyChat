import React from 'react';

import { Text, View, FlatList, StatusBar } from 'react-native';
import ConversationScreen from "../conversation/ConversationScreen";
import ConversationListItem from "./ConversationListItem";
import colors from "../../styles/colors";

export default class ConversationListScreen extends React.Component {
  static navigationOptions = {
    title: "Conversations"
  };

  constructor() {
    super();
    this.state = {
      conversations: [
        {
          id: '0',
          name: "Hello"
        },
        {
          id: '1',
          name: "Test"
        }
      ]
    };
  }

  renderItem(conversation) {
    return <ConversationListItem conversation={conversation} />;
  }

  render() {
    return (
      <View>
        <StatusBar translucent backgroundColor="rgba(0,0,0,0.3)" />
        <FlatList data={this.state.conversations}
                  renderItem={({item}) => this.renderItem(item)}
                  keyExtractor={(item, index) => item.id} />
      </View>
    );
  }
}