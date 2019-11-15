

import React, {Component} from 'react';
import {Platform, StyleSheet,Button, Text, View} from 'react-native';
import NavigationUtill from '../navigator/NavigationUtill'


export default class FavoritePage extends Component {


  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>PopularPage</Text>
        <Button
                title="改变主题色"
                onPress={() => {
                    navigation.setParams({theme:{
                        tintColor:'red',
                        updateTime:new Date().getTime()
                    }})
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
