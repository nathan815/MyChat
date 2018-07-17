import React from 'react';

import {
    Alert,
    Text,
    TextInput,
    View,
    Button
} from 'react-native';

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        title: "Sign in"
    };
    submit = () => {
        Alert.alert("Signing in...", "This shouldn't take too long.");
    };
    render() {
        return (
            <View>
                <TextInput placeholder="Email" />
                <TextInput placeholder="Password" />
                <Button onPress={this.submit} title="Sign In" />
            </View>
        );
    }
}