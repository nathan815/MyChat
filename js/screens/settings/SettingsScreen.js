import React from 'react';
import { View, Button, Text } from 'react-native';
export default class SettingsScreen extends React.Component {
  state = { showText: false };
  static navigationOptions = {
    title: 'Settings'
  };
  constructor() {
    super();
  }
  sayHello = () => {
    alert("Hello there!")
    this.setState({
      showText: !this.state.showText
    });
    console.log('hello')
  };
  render() {
    let hello = null;
    if(this.state.showText)
      hello = <Text>Hello LAZ!</Text>;
    return (
      <View>
        { hello }
        { this.state.showText ? <Text>Hello LAZ!</Text> : null }
        <Button onPress={this.sayHello} title="Hello" />
      </View>
    )
  }
}
