

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button,} from 'react-native';
import HooksComponent from './HooksComponent';

export default class RNHooksPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>RNHooksPage</Text>
        <HooksComponent
         count = {10}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
