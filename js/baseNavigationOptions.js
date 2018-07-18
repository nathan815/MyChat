import React from 'react';
import { TouchableOpacity, StatusBar } from 'react-native';
import { Icon } from 'native-base';
import colors from './styles/colors';
const extraSpaceHeaderTop = StatusBar.currentHeight ? StatusBar.currentHeight : 0;
export const baseNavigationOptions = {
  headerMode: 'float',
  navigationOptions: ({navigation}) => ({
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: '#fff',
    },
    headerStyle: {
      backgroundColor: colors.primary,
      paddingTop: extraSpaceHeaderTop,
      height: 50 + extraSpaceHeaderTop,
    },
  })
};

export const navigationOptionsWithHamburger = ({navigation}) => ({
  ...baseNavigationOptions,
  headerLeft: (
    <TouchableOpacity onPress={navigation.openDrawer} >
      <Icon name="menu" ios="ios-menu" android="md-menu" style={{ fontSize: 25, color: '#fff', paddingLeft: 20 }} />
    </TouchableOpacity>
  ),
});
