

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, WebView, BackHandler} from 'react-native';
import NavigationBar from '../common/NavigationBar'
import ViewUtil from '../common/ViewUtil'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {device}from '../DeviceUtill'
import  NavigationUtill from '../navigator/NavigationUtill'

const ThemeColor = 'red';
const TRENDING_URL = 'https://github.com/';

export default class DetailPage extends Component {
  constructor(props) {
    super(props);
    const {projectModel} = this.props.navigation.state.params;
    console.log('projectModel',projectModel);
    const title = projectModel.full_name || projectModel.fullName;
    this.url = projectModel.html_url || TRENDING_URL + projectModel.fullName;
    this.state = {
        title: title,
        url: this.url,
        canGoBack: false,
    };
}

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress',this.onBackPress);
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress',this.onBackPress);
  }

  renderRightButton() {
    return (<View style={{flexDirection: 'row'}}>
            <TouchableOpacity>
                <FontAwesome
                    name={this.state.isFavorite ? 'star' : 'star-o'}
                    size={20}
                    style={{color: 'white', marginRight: 10}}
                />
            </TouchableOpacity>
            {ViewUtil.getShareButton(() => {
                })}
        </View>
    )
  }

  onNavigationStateChange(navState) {
    this.setState({
        canGoBack: navState.canGoBack,
        url: navState.url,
    })
}

  onBackPress = () => {
    this.onBack();
    return true;
  }

  onBack() {
    if (this.state.canGoBack) {
        this.webView.goBack();
    } else {
      NavigationUtill.goBack(this.props.navigation);
    }
  }

  render() {
    const titleLayoutStyle = this.state.title.length > 20 ? {paddingRight: 20} : null;
    return (
      <View style={styles.container}>
        <NavigationBar
          leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
          title={this.state.title}
          style={{height: 44,backgroundColor:ThemeColor}}
          titleLayoutStyle={titleLayoutStyle}
          rightButton={this.renderRightButton()}
        />
        <View style = {{height:device.height-64,width:device.width,overflow:'hidden'}}>
          <WebView
            ref={webView => this.webView = webView}
            startInLoadingState={true}
            onNavigationStateChange={e => this.onNavigationStateChange(e)}
            source={{uri: this.state.url}}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColor,
  },
});
