import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { ListItem, Body } from 'native-base';

export default class ConversationListItem extends React.PureComponent {
  render() {
    const { name, lastMessage } = this.props.conversation;
    return (
      <ListItem style={styles.item} onPress={this.props.onClick}>
        <Body>
          <View style={styles.thumbnail}></View>
          <View style={styles.text}>
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.lastMessageText}>{lastMessage ? lastMessage : <Text style={styles.grey}>No messages yet.</Text>}</Text>
          </View>
        </Body>
      </ListItem>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  thumbnail: {
    width: 50,
    height: 50,
    backgroundColor: 'red'
  },
  text: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  nameText: {
    textAlign: 'left',
    fontSize: 17,
    fontWeight: 'bold'
  },
  grey: {
    color: '#555'
  }
});
