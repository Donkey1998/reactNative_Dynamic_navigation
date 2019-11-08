

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import NavigationUtill from '../navigator/NavigationUtill'

export default class WelcomePage extends Component {
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
        <Text style={styles.welcome}>WelcomePage</Text>
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
