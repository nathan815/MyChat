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

const defaultNavOptions = {
  headerMode: 'screen',
  navigationOptions: ({navigation}) => ({
    headerLeft: (
      <TouchableOpacity onPress={navigation.openDrawer} >
        <Icon name="menu" style={{ fontSize: 25, color: '#fff', paddingLeft: 20 }} />
      </TouchableOpacity>
    ),
    headerStyle: {
      backgroundColor: colors.primary,
      paddingTop: StatusBar.currentHeight,
      height: 55 + StatusBar.currentHeight,
    },
    headerTitleStyle: {
      color: '#fff',
    },
  })
};


const ConversationStack = createStackNavigator({
  ConversationList: ConversationListScreen,
  Conversation: ConversationScreen
}, defaultNavOptions);

const PeopleStack = createStackNavigator({
  People: PeopleScreen,
}, defaultNavOptions);

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
}, defaultNavOptions);

const LoggedInStack = createDrawerNavigator({
  ConversationList: ConversationStack,
  People: PeopleStack,
  Settings: SettingsStack,
  Logout: LogoutScreen
});

const LoggedOutStack = createStackNavigator({
  Home: HomeScreen,
  Login: LoginScreen,
  Register: RegisterScreen,
}, {
  navBar
});

export default createSwitchNavigator({
  AppLoading: LoadingScreen,
  LoggedIn: LoggedInStack,
  LoggedOut: LoggedOutStack,
}, {
  initialRouteName: 'AppLoading'
});