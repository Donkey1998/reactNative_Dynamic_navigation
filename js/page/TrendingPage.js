

import React, {Component} from 'react';
import {Platform, StyleSheet, Button, Text, View} from 'react-native';
import NavigationUtill from '../navigator/NavigationUtill'
import {connect} from 'react-redux'
import actions from '../action/index'
 class TrendingPage extends Component {

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>TrendingPage</Text>
        <Button
                title="改变主题色"
                onPress={() => {
                   this.props.onThemeChange('#096');
                }}
                />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  
});

const mapDispatchToProps = dispatch => ({
  onThemeChange: (theme) => dispatch(actions.onThemeChange(theme)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrendingPage);

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
