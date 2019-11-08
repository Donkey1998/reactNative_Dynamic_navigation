/**
 * @format
 */

import {AppRegistry} from 'react-native';
import { createAppContainer } from 'react-navigation';
import App from './App';
import WelcomePage from './js/page/WelcomePage'
import AppNavigator from './js/navigator/AppNavigator'
import {name as appName} from './app.json';
const AppStackNavigatorContainer = createAppContainer(AppNavigator);
AppRegistry.registerComponent(appName, () => AppStackNavigatorContainer);
