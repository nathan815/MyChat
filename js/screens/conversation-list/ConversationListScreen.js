import React from 'react';

import {
    Text,
    View
} from 'react-native';

export default class ConversationListScreen extends React.Component {
    static navigationOptions = {
        title: "Conversations"
    };
    render() {
        return (
            <View>
                <Text>here lies the conversations...</Text>
            </View>
        );
    }
}