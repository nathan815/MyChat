import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { ListItem, Body, Left, Right, Text } from 'native-base';
import TimeAgo from 'react-native-timeago';
import Moment from 'moment';
import firebase from 'react-native-firebase';
import colors from '../../styles/colors';

export default class ConversationListItem extends React.PureComponent {
  render() {
    const { text, sentOn, userId, senderName } = this.props.message;

    const showTimeAgo = Moment(sentOn).isSame(new Date(), 'hour');
    const displayDate = showTimeAgo ? <TimeAgo time={sentOn} hideAgo={true} /> : Moment(sentOn).format('h:mm a');

    const isMyMessage = firebase.auth().currentUser.uid === userId
    const messageStyle = isMyMessage ? styles.myMessage : styles.theirMessage;
    const messageContainerStyle = isMyMessage ? styles.myMessageContainer : styles.theirMessageContainer;
    const messageTextStyle = isMyMessage ? styles.myMessageText : styles.theirMessageText;
    return (
      <View style={[styles.container, messageContainerStyle]}>
        { !isMyMessage && <Text style={styles.senderNameText}>{ senderName }</Text> }
        <View style={[styles.message, messageStyle]}>
          <Text style={[styles.messageText, messageTextStyle]}>{text}</Text>
        </View>
        <Text style={styles.timestampText}>{ displayDate }</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  myMessageContainer: {
    alignItems: 'flex-end',
  },
  theirMessageContainer: {
    alignItems: 'flex-start',
  },
  message: {
    ...Platform.select({
      ios: {
        borderRadius: 25,
        paddingVertical: 9
      },
      android: {
        borderRadius: 15,
        paddingVertical: 12
      }
    }),
    paddingHorizontal: 15,
    marginVertical: 3,
    shadowRadius: 10,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
    borderTopRightRadius: Platform.OS === 'android' ? 5 : null,
  },
  myMessageText: {
    color: '#fff',
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderTopLeftRadius: Platform.OS === 'android' ? 5 : null,
  },
  theirMessageText: {
    color: '#555'
  },
  senderNameText: {
    color: '#777',
    fontSize: 13
  },
  timestampText: {
    color: '#777',
    fontSize: 11
  },
});
