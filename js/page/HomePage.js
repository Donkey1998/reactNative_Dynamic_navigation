

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator,createBottomTabNavigator,createMaterialTopTabNavigator,createSwitchNavigator,createAppContainer} from 'react-navigation';
import MyPage from './MyPage';
import FavoritePage from './FavoritePage';
import TrendingPage from './TrendingPage';
import PopularPage from './PopularPage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import NavigationUtill from '../navigator/NavigationUtill';
import  DynamicTabNavigator from '../navigator/DynamicTabNavigator';

export default class HomePage extends Component {
  _tabNavigator(){
    return  createBottomTabNavigator({
      PopularPage: {
        screen: PopularPage,
        navigationOptions:{
          tabBarLabel: '最热',
          tabBarIcon: ({tintColor, focused}) => (
            <MaterialIcons
                name={'whatshot'}
                size={26}
                style={{color: tintColor}}
            />
        ),
        }
      },
      TrendingPage: {
        screen: TrendingPage,
        navigationOptions:{
          tabBarLabel: '趋势',
          tabBarIcon: ({tintColor, focused}) => (
            <Ionicons
                name={'md-trending-up'}
                size={26}
                style={{color: tintColor}}
            />
        ),
        }
      },
      FavoritePage: {
        screen: FavoritePage,
        navigationOptions:{
          tabBarLabel: '收藏',
          tabBarIcon: ({tintColor, focused}) => (
            <MaterialIcons
                name={'favorite'}
                size={26}
                style={{color: tintColor}}
            />
        ),
        }
      },
      MyPage: {
        screen: MyPage,
        navigationOptions:{
          tabBarLabel: '我的',
          tabBarIcon: ({tintColor, focused}) => (
            <Entypo
                name={'user'}
                size={26}
                style={{color: tintColor}}
            />
        ),
        }
      },
      
    });
  }
  render() {
  // 固定的底部的导航栏
  //   //在NavigationUtill中创建一个变量navigation， 用于存储外部navigation
  //   NavigationUtill.navigation = this.props.navigation;
  //   // 在react navigation3.x中，导航器是不能直接暴露给react组件的，比如我的错误就是  https://blog.csdn.net/Cui_xing_tian/article/details/89493818
  //  const Tab = createAppContainer(this._tabNavigator());
  //  return <Tab/>

    //在NavigationUtill中创建一个变量navigation， 用于存储外部navigation
    NavigationUtill.navigation = this.props.navigation;
      return <DynamicTabNavigator/>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
