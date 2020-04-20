

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button,DeviceEventEmitter,StatusBar} from 'react-native';
import { NativeModules } from 'react-native';
import ButtonView from '../common/AndroidRCTButtonView';
import {device} from '../../js/DeviceUtill'

export default class RNMoudelPage extends Component {
  constructor(props){
    super(props);
    
  }
  componentDidMount(){
    
  
     //注册扫描监听
     DeviceEventEmitter.addListener('sendEventToRn', (value)=>{console.log('DeviceEventEmitter -->',value)});
     DeviceEventEmitter.addListener('sendThreadDeviceEvent', (value)=>{console.log('DeviceEventEmitter -->',value)});
  }

  onButtonConfirm(data){
    console.log("Android原生组件",data);
  }

  onButtonCancel(data){
    console.log("Android原生组件",data);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={false} barStyle={'dark-content'}/>
        <View style={{ height: 40,backgroundColor:'red'}} >

          <ButtonView
              title="RN传到Android的数据"
              style={{ height: 40}}
              onButtonConfirm={event => this.onButtonConfirm(event.nativeEvent.data)}
              onButtonCancel={event => this.onButtonCancel(event.nativeEvent.data)}
              />   
        </View>
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
                title="RN获取Activity相关的回调"
                onPress={() => {
                  NativeModules.RNManagerModule.RNActivityResult({strData:'RN向Android传输的数据'},(onDone)=>{console.log('onDone-->',onDone.result)},(onCancel) => {console.log('onCancel-->',onCancel)});
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
    width:device.width,
    height:device.height,
    backgroundColor: '#F5FCFF',
  },
});
