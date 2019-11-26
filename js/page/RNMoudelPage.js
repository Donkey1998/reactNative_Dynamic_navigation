

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button,DeviceEventEmitter} from 'react-native';
import { NativeModules } from 'react-native';

export default class RNMoudelPage extends Component {
  componentDidMount(){
     //注册扫描监听
     DeviceEventEmitter.addListener('sendEventToRn', (value)=>{console.log('DeviceEventEmitter -->',value)});
     DeviceEventEmitter.addListener('sendThreadDeviceEvent', (value)=>{console.log('DeviceEventEmitter -->',value)});
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>RNMoudelPage</Text>
        <Button 
                title="调用原生toast"
                onPress={() => {
                  NativeModules.RNManagerModule.RNToast('调用原生方法的Demo');
                }}
                />
        <Button 
                title="跳转到Android Activity"
                onPress={() => {
                  NativeModules.RNManagerModule.RNActivity();
                }}
                />
        <Button 
                title="RN用Promise机制调用安卓原生代码"
                onPress={() => {
                  NativeModules.RNManagerModule.RNPromise('promise调用原生')
                  .then(
                    (msg) => {
                      console.log('promise收到消息:'+msg);
                    }
                  )
                  .catch(
                    (err)=>{
                        console.log(err);
                    }
                  )
                }}
                />
        <Button 
                title="RN用callback回调方式与安卓原生代码通信"
                onPress={() => {
                  NativeModules.RNManagerModule.RNCallback(
                    (errorCallback)=>{
                        console.log("回调-->",errorCallback);
                    },
                    (successCallback)=>{
                        console.log("回调-->",successCallback);
                    }
                )
                }}
                />
         <Button 
                title="RNDeviceEventEmitter方式实现与android原生模块交互"
                onPress={() => {
                  NativeModules.RNManagerModule.RNDeviceEvent();
                }}
                />
        <Button 
                title="多线程RNDeviceEventEmitter方式实现与android原生模块交互"
                onPress={() => {
                  NativeModules.RNManagerModule.RNThreadDeviceEvent();
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
