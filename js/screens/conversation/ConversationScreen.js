import React from 'react';

import {
    Text,
    View
} from 'react-native';

export default class ConversationScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params ? navigation.state.params.title : "Conversation"}`,
    })
    componentDidMount() {
        this.props.navigation.setParams({ title: this.props.navigation.getParam('conversation').name })
    }
    render() {
        return (
            <View>
                <Text>{this.props.navigation.getParam('conversation').conversationId}</Text>
            </View>
        );
    }
}
