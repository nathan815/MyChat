import React from 'react';
import { View, Text } from 'react-native';

export default class ConversationListItem extends React.Component {
  render() {
    return (
      <View>
        <Text>{this.props.conversation.name}</Text>
      </View>
    )
  }
}