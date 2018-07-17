
import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ConversationListScreen from './screens/conversation-list/ConversationListScreen';
import ConversationScreen from './screens/conversation/ConversationScreen';

const RootStack = createStackNavigator({
    Home: HomeScreen,
    Login: LoginScreen,
    Register: RegisterScreen,
    ConversationList: ConversationListScreen,
    Conversation: ConversationScreen,
});

type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <RootStack />
        );
    }
}
