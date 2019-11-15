import React from 'react';
import MyPage from '../page/MyPage';
import FavoritePage from '../page/FavoritePage';
import TrendingPage from '../page/TrendingPage';
import PopularPage from '../page/PopularPage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {BottomTabBar, createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from "react-navigation";
import NavigationUtill from './NavigationUtill';
import {Platform, StyleSheet, Text, View} from 'react-native';

const TABS = {//在这里配置页面的路由
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
};

export default class DynamicTabNavigator extends React.Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
    }

    /**
     * 获取动态的Tab
     * @returns {*}
     * @private
     */
    _tabNavigator() {
        const {PopularPage, TrendingPage,FavoritePage} = TABS;//根据需要定制要显示的tab
        let tabs = {PopularPage, TrendingPage,FavoritePage}
        PopularPage.navigationOptions.tabBarLabel = '最棒';//动态修改Tab的属性
        
        return createAppContainer(createBottomTabNavigator(tabs, {//应用修改后的tab
            tabBarComponent: TabBarComponent,
        }));
    }

    render() {
        const Tabs = this._tabNavigator();
        return (
            <Tabs/>
        );
    }
}

class TabBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.theme = {
            tintColor: props.activeTintColor,
            updateTime: new Date().getTime()
        }
    }

    render() {
        const {routes, index} = this.props.navigation.state;
        console.log('DynamicTabNavigator.jsroutes',routes)
        console.log('DynamicTabNavigator.jsindex',index)
        console.log('DynamicTabNavigator.jsroutes[index].params',routes[index].params)
        if (routes[index].params) {
            const {theme} = routes[index].params;
            if (theme && theme.updateTime > this.theme.updateTime) {
                this.theme = theme;
            }
        }

        /**
         * custom tabBarComponent
         * https://github.com/react-navigation/react-navigation/issues/4297
         */
        return (
            <BottomTabBar
                {...this.props}
                activeTintColor={this.theme.tintColor || this.props.activeTintColor}
            />
        );
    }

}


