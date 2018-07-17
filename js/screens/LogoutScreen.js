import React from 'react';

export default class LogoutScreen extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.navigation.navigate('LoggedOut');
  }
  render() {
    return null;
  }
}