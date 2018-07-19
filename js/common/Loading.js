import colors from "../styles/colors";
import {StyleSheet} from "react-native";
import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

const Loading = (props) => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.loadingText}>{ props.loadingText }</Text>
    </View>
  );
};
export default Loading;


const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingText: {
    color: colors.primary
  },
});
