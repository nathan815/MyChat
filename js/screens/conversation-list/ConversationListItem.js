import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ListItem, Body, Left, Right, Text } from 'native-base';
import TimeAgo from 'react-native-timeago';
import Moment from 'moment';

export default class ConversationListItem extends React.PureComponent {
  render() {
    const { name, lastMessage, updatedOn, color } = this.props.conversation;
    const showTimeAgo = Moment(updatedOn).isSame(new Date(), 'day');
    const displayDate = showTimeAgo ? <TimeAgo time={updatedOn} hideAgo={true} /> : Moment(new Date()).format('MM/DD/YYYY');
    return (
      <ListItem avatar style={styles.item} onPress={this.props.onClick}>
        <Left>
          <View style={[styles.thumbnail, {backgroundColor: color} ]}></View>
        </Left>
        <Body>
          <View style={styles.text}>
            <Text style={styles.nameText}>{name}</Text>
            <Text note>{lastMessage ? lastMessage : <Text style={styles.grey}>No messages yet.</Text>}</Text>
          </View>
        </Body>
        <Right>
          <Text note>
            { displayDate }
          </Text>
        </Right>
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
    width: 40,
    height: 40,
    borderRadius: 100
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
    color: '#555',
    fontSize: 15
  }
});
