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
        this.props.navigation.navigate('LoggedIn');
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