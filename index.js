import { AppRegistry } from 'react-native';
import App from './js/App';
AppRegistry.registerComponent('ChatApp', () => App);


import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Class RCTCxxModule', 'Remote debugger']);
