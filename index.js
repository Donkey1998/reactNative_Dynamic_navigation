/**
 * @format
 */

// import {AppRegistry} from 'react-native';
// import { createAppContainer } from 'react-navigation';
// import App from './App';
// import WelcomePage from './js/page/WelcomePage'
// import AppNavigator from './js/navigator/AppNavigator'
// import {name as appName} from './app.json';
// const AppStackNavigatorContainer = createAppContainer(AppNavigator);
// AppRegistry.registerComponent(appName, () => AppStackNavigatorContainer);



import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
AppRegistry.registerComponent(appName, () => App);

