import React from 'react';
import {TouchableOpacity,StatusBar,Platform} from "react-native";
import {createStackNavigator, createDrawerNavigator, createSwitchNavigator} from "react-navigation";
import { Icon } from 'native-base';

import colors from './styles/colors';

import LoginScreen from "./screens/LoginScreen";
import ConversationListScreen from "./screens/conversation-list/ConversationListScreen";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ConversationScreen from "./screens/conversation/ConversationScreen";
import LoadingScreen from "./screens/LoadingScreen";
import PeopleScreen from './screens/people/PeopleScreen';
import SettingsScreen from './screens/settings/SettingsScreen';
import LogoutScreen from './screens/LogoutScreen';

import DrawerContent from './DrawerContent';

import { baseNavigationOptions, navigationOptionsWithHamburger } from './baseNavigationOptions';
const ConversationStack = createStackNavigator({
  ConversationList: {
    screen: ConversationListScreen,
    navigationOptions: navigationOptionsWithHamburger
  },
  Conversation: ConversationScreen,
}, baseNavigationOptions);

const PeopleStack = createStackNavigator({
  People: {
    screen: ConversationListScreen,
    navigationOptions: navigationOptionsWithHamburger
  },
}, baseNavigationOptions);

const SettingsStack = createStackNavigator({
  Settings: {
    screen: SettingsScreen,
    navigationOptions: navigationOptionsWithHamburger
  },
}, baseNavigationOptions);

export const LoggedInNavigator = createDrawerNavigator({
  ConversationList: { 
    screen: ConversationStack, 
    navigationOptions: { 
      drawerLabel: "Conversations",
      drawerIcon: ({tintColor}) => <Icon ios="ios-chatbubbles" android="md-chatbubbles" tintColor={tintColor} />
    },
  },
  People: {
    screen: PeopleStack,
    navigationOptions: {
      drawerLabel: "People",
      drawerIcon: ({tintColor}) => <Icon ios="ios-people" android="md-people" tintColor={tintColor} />
    }
  },
  Settings: {
    screen: SettingsStack,
    navigationOptions: {
      drawerLabel: "Settings",
      drawerIcon: ({tintColor}) => <Icon ios="ios-settings" android="md-settings" tintColor={tintColor} />
    }
  },
  Logout: {
    screen: LogoutScreen,
    navigationOptions: {
      drawerLabel: "Log Out",
      drawerIcon: ({tintColor}) => <Icon ios="ios-exit" android="md-exit" tintColor={tintColor} />
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
  gesturesEnabled: false
});
