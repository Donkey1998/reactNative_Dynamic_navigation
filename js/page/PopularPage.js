

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import NavigationUtill from '../navigator/NavigationUtill'
import {createMaterialTopTabNavigator,createAppContainer} from 'react-navigation';

export default class PopularPage extends Component {
  constructor(props){
    super(props);
    console.disableYellowBox = true;
    this.tabNames =['A','B','C','D','E','F','G','H'];
  }

  _getTabs(){
    const tabs ={};
    this.tabNames.forEach((item,index)=>{
      tabs[`tab${index}`]={
        // 往PopularTab界面传递数据
        screen:props => <PopularTab {...props} tabLaber = {item}/>,
        navigationOptions:{
          title: item
        }
      }
    })
    return tabs;
  }

  // _TabNavigator () {
  //   return createMaterialTopTabNavigator({
  //     PopularTab1: {
  //       screen: PopularTab,
  //       navigationOptions:{
  //         title: '最热',
  //        }
  //       },
  //     PopularTab2: {
  //       screen: PopularTab,
  //       navigationOptions:{
  //         title: '最热',
  //         }
  //       }
  //     });
  //   }

  _TabNavigator () {
    return createMaterialTopTabNavigator(
      this._getTabs(),{
        tabBarOptions:{
          tabStyle:styles.tabStyle,
          upperCaseLabel: false, //是否使标签大写 默认为true
          scrollEnabled:true, //是否支持啊选项卡滚动 默认为 false
          style:{
            backgroundColor:'#678' //TabBar的背景色
          },
          indicatorStyle:styles.indicatorStyle, //标签指示器的样式
          labelStyle:styles.labelStyle,//文字的样式
        }
      }
      );
    }

    render() {
      const Tab = createAppContainer(this._TabNavigator());
      return(
        <View style={{flex:1}}>
          <Tab/>
        </View>
      );
      
      
    }
}

class PopularTab extends Component {
  render() {
    const {tabLaber} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{tabLaber}</Text>
        <Text onPress = {() => {NavigationUtill.goPage({},'DetailPage')}}>跳转到详情页</Text>
      </View>
    );
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
  tabStyle:{
    minWidth:50,
  },
  indicatorStyle:{
    height:2,
    backgroundColor:'white',
  },
  indicatorStyle:{
    fontSize:13,
    marginTop:6,
  }
});
