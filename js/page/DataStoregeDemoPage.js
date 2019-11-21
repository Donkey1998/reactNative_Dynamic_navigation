

import React, {Component} from 'react';
import {Platform, StyleSheet,Button, Text, View,TextInput} from 'react-native';
import DataStore from '../expand/dao/DataStore'

export default class DataStoregeDemoPage extends Component {
    constructor(props) {
        super(props);
        this.dataStore = new DataStore();
        this.state = {
         inputText:'',
         showText:''
        }
    }

 loadData() {
     let url =`https://api.github.com/search/repositories?q=${this.value}`;
     this.dataStore.fetchData(url)
     .then(
        data => {
        let showData = `初次数据加载时间：${new Date(data.timestamp)}\n${JSON.stringify(data.data)}`
        this.setState({
            showText:showData
        })
     })
    .catch(error=>{
        error&&console.log(error.toString());
    })
 }

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <TextInput 
            style={styles.welcome}
            value={this.state.inputText}
            onChangeText = {text => { this.setState({inputText:text}); this.value = text}}
            />
        <Button
                title="获取数据"
                onPress={() => {
                   this.loadData();
                }}
                />
        <Text>{this.state.showText}</Text>
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
