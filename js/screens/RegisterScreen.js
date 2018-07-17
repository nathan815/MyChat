import React from 'react';

import {
    Alert,
    Text,
    TextInput,
    View,
    Button
} from 'react-native';

export default class RegisterScreen extends React.Component {
    static navigationOptions = {
        title: "Create Account"
    };
    submit = () => {
        Alert.alert("Creating account...", "This shouldn't take too long.");
    };
    render() {
        return (
            <View>
                <TextInput placeholder="Email" />
                <TextInput placeholder="Password" />
                <TextInput placeholder="Confirm Password" />
                <Button title="Create Account" onPress={this.submit} />
            </View>
        );
    }
}