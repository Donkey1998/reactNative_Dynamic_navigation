

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button,} from 'react-native';
import NavigationUtill from '../navigator/NavigationUtill';


export default class MyPage extends Component {
  componentDidMount(){
    this.timer = setTimeout(() => {
      NavigationUtill.resetToHomePage({
        navigation: this.props.navigation
      })
    },2000)
  }

  componentWillUnMount(){
    this.timer && clearTimeout(this.timer); 
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>MyPage</Text>
        <Button
                title="跳转到RNMoudelPage"
                onPress={() => {
                  NavigationUtill.goPage({},'RNMoudelPage')
                }}
                />
        
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
