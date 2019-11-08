

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import NavigationUtill from '../navigator/NavigationUtill'
import {createMaterialTopTabNavigator,createAppContainer} from 'react-navigation';

export default class PopularPage extends Component {
  constructor(props){
    super(props);
    console.disableYellowBox = true;
  }
  _TabNavigator () {
    return createMaterialTopTabNavigator({
      PopularTab1: {
        screen: PopularTab,
        navigationOptions:{
          title: '最热',
         }
        },
      PopularTab2: {
        screen: PopularTab,
        navigationOptions:{
          title: '最热',
          }
        }
      });
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
});
