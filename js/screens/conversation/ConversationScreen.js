import React from 'react';

import {
    Text,
    View
} from 'react-native';

export default class ConversationScreen extends React.Component {
    static navigationOptions = {
        title: "Conversation with ..."
    };
    render() {
        return (
            <View>
                <Text>hello!</Text>
            </View>
        );
    }
}