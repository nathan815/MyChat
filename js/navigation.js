import React from 'react';
import { createStackNavigator, createDrawerNavigator } from "react-navigation";
import { Icon } from 'native-base';

import colors from './styles/colors';

import LoginScreen from "./screens/LoginScreen";
import ConversationListScreen from "./screens/conversation-list/ConversationListScreen";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ConversationScreen from "./screens/conversation/ConversationScreen";
import NewConversationScreen from "./screens/new-conversation/NewConversationScreen";
import PeopleScreen from './screens/people/PeopleScreen';
import SettingsScreen from './screens/settings/SettingsScreen';
import LogoutScreen from './screens/LogoutScreen';

import DrawerContent from './DrawerContent';

import {
  baseNavigationOptions, navigationOptionsWithHamburger, extraSpaceHeaderTop
} from './baseNavigationOptions';

const ConversationStack = createStackNavigator({
  ConversationList: {
    screen: ConversationListScreen,
    navigationOptions: navigationOptionsWithHamburger
  },
  Conversation: ConversationScreen,
  NewConversation: {
    screen: NewConversationScreen,
    mode: 'modal'
  },
}, baseNavigationOptions);

const PeopleStack = createStackNavigator({
  People: {
    screen: PeopleScreen,
    navigationOptions: navigationOptionsWithHamburger
  },
}, baseNavigationOptions);

const SettingsStack = createStackNavigator({
  Settings: {
    screen: SettingsScreen,
    navigationOptions: navigationOptionsWithHamburger
  },
}, baseNavigationOptions);

const drawerIcon = (name, tintColor) => (
  <Icon name={name}
        ios={`ios-${name}`}
        android={`md-${name}`}
        color={tintColor} />
);

export const LoggedInNavigator = createDrawerNavigator({
  ConversationList: {
    screen: ConversationStack,
    navigationOptions: { 
      drawerLabel: 'My Conversations',
      drawerIcon: ({tintColor}) => drawerIcon('chatbubbles', tintColor)
    },
  },
  People: {
    screen: PeopleStack,
    navigationOptions: {
      drawerLabel: 'People',
      drawerIcon: ({tintColor}) => drawerIcon('people', tintColor)
    }
  },
  Settings: {
    screen: SettingsStack,
    navigationOptions: {
      drawerLabel: 'Settings',
      drawerIcon: ({tintColor}) => drawerIcon('settings', tintColor)
    }
  },
  Logout: {
    screen: LogoutScreen,
    navigationOptions: {
      drawerLabel: 'Logout',
      drawerIcon: ({tintColor}) => drawerIcon('exit', tintColor)
    }
  },
}, {
  contentComponent: DrawerContent,
  contentOptions: {
    activeTintColor: colors.primary,
  },
});

export const LoggedOutNavigator = createStackNavigator({
  Home: HomeScreen,
  Login: LoginScreen,
  Register: RegisterScreen,
}, {
  mode: 'modal',
  gesturesEnabled: false,
  navigationOptions: {
    headerStyle: {
      paddingTop: extraSpaceHeaderTop,
      height: 55 + extraSpaceHeaderTop,
    },
    headerTintColor: colors.primary,
  }
});
