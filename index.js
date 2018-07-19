import { AppRegistry } from 'react-native';
import App from './js/App';
import { YellowBox } from 'react-native';

AppRegistry.registerComponent('ChatApp', () => App);


YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);