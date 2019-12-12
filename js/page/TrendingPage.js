

import React, {Component} from 'react';

import {StyleSheet, ActivityIndicator,Text, View, FlatList, RefreshControl, TouchableOpacity} from 'react-native';
import NavigationUtill from '../navigator/NavigationUtill';
import {createMaterialTopTabNavigator,createAppContainer} from 'react-navigation';
import {connect} from 'react-redux';
import actions from '../action';
import TrendingItem from '../common/TrendingItem';
import NavigationBar from '../common/NavigationBar'
import Ionicons from 'react-native-vector-icons/Ionicons'

const URL = 'https://github.com/trending/';
const QUERY_STR = '&sort=stars';//搜索的排序规则 我们按照点赞量排序
const ThemeColor = 'red';
const pageSize = 10;//设为常量，防止修改
 export default class TrendingPage extends Component {
  constructor(props){
    super(props);
    console.disableYellowBox = true;
    this.tabNames =['Python','Java','C','JavaScript'];
  }

  _getTabs(){
    const tabs ={};
    this.tabNames.forEach((item,index)=>{
      tabs[`tab${index}`]={
        // 往TrendingTab界面传递数据
        screen:props => <TrendingTabPage {...props} tabLabel = {item}/>,
        navigationOptions:{
          title: item
        }
      }
    })
    return tabs;
  }

  _TabNavigator () {
    return createMaterialTopTabNavigator(
      this._getTabs(),{
        tabBarOptions:{
          tabStyle:styles.tabStyle,
          upperCaseLabel: false, //是否使标签大写 默认为true
          scrollEnabled:true, //是否支持啊选项卡滚动 默认为 false
          style:{
            backgroundColor:'#678',//TabBar的背景色
            height: 50//fix 开启scrollEnabled后再Android上初次加载时闪烁问题
          },
          indicatorStyle:styles.indicatorStyle, //标签指示器的样式
          labelStyle:styles.labelStyle,//文字的样式
        },
        lazy: true  //  true，则仅在使选项卡处于活动状态或快速扫视时才显示它们。 如果false，则所有选项卡都将立即呈现。
      }
      );
    }

    renderRightButton() {
      const {theme} = this.props;
      return <TouchableOpacity
          onPress={() => {
              // AnalyticsUtil.track("SearchButtonClick");
              // NavigationUtil.goPage({theme}, 'SearchPage')
          }}
      >
          <View style={{padding: 5, marginRight: 8}}>
              <Ionicons
                  name={'ios-search'}
                  size={24}
                  style={{
                      marginRight: 8,
                      alignSelf: 'center',
                      color: 'white',
                  }}/>
          </View>
      </TouchableOpacity>
    }

    render() {
      const Tab = createAppContainer(this._TabNavigator());
      let statusBar = {
        backgroundColor: ThemeColor,
        barStyle: 'light-content',
        };
      let navigationBar = <NavigationBar
            title={'趋势'}
            statusBar={statusBar}
            style={{backgroundColor: ThemeColor}}
            rightButton={this.renderRightButton()}
        />;
      return(
        <View style={{flex:1}}>
           {navigationBar}
          <Tab/>
        </View>
      );  
    }
}



class TrendingTab extends Component{
  constructor(props) {
    super(props);
    const {tabLabel} = this.props;
    this.storeName = tabLabel;
    
  }

  componentDidMount(){
    this.loadData();
  }

  loadData(loadMore){
    const {onRefreshTrending, onLoadMoreTrending,} = this.props;
        const store = this._store();
        const url = this.genFetchUrl(this.storeName);
        if (false) {
            onLoadMoreTrending(this.storeName, ++store.pageIndex, pageSize, store.items,callback=>{
              console.log('没有更多了')
            })
        }  else {
            onRefreshTrending(this.storeName, url, pageSize);
        }
  }
  /**
     * 获取与当前页面有关的数据
     * @returns {*}
     * @private
     */
    _store() {
      const {trending} = this.props;
      let store = trending[this.storeName];
      if (!store) {
          store = {
              items: [],
              isLoading: false,
              projectModels: [],//要显示的数据
              hideLoadingMore: true,//默认隐藏加载更多
          }
      }
      return store;
  }
  
  genFetchUrl(key) {
    return URL + key;
  }

  renderItem = ({index, item}) => {
    console.log('shuju-->1',item);
    return (
      <TrendingItem
        item = {item}
        onSelect = {()=>{this.onSelect()}}
      />
    );
  }

  onSelect(){

  }

 genIndicator() {
    return this._store().hideLoadingMore ? null :
        <View style={styles.indicatorContainer}>
            <ActivityIndicator
                style={styles.indicator}
            />
            <Text>正在加载更多</Text>
        </View>
  }

  createListHeader() {
    return  null;
 }


  render() {
    let store = this._store();
    return(
      <View style={styles.container}>
       <FlatList
          data={store.projectModels}
          renderItem={({ index, item }) => this.renderItem({ index, item })}
          ListHeaderComponent={this.createListHeader()}
          refreshControl={
            <RefreshControl
              titleColor={'reg'}
              colors={['#00ff00']}
              refreshing={store.isLoading}
              onRefresh={() => this.loadData()}
              tintColor={'reg'}
            />
          }
          ListFooterComponent={() => this.genIndicator()}
          onEndReached={() => {
            console.log('---onEndReached----');
            this.loadData(true);           
          }}
          onEndReachedThreshold={0.1}
       />
    </View>
    );  
  }

}

const mapStateToPorps = state =>({
  trending: state.trending 
});

const mapDispatchToProps = dispatch =>({
onRefreshTrending: (storeName, url, pageSize,) => dispatch(actions.onRefreshTrending(storeName, url, pageSize)),
onLoadMoreTrending: (storeName, pageIndex, pageSize, items,  callBack) => dispatch(actions.onLoadMoreTrending(storeName, pageIndex, pageSize, items, callBack)),
})

const TrendingTabPage = connect(mapStateToPorps,mapDispatchToProps)(TrendingTab);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // 修复loding图标第一次加载闪一下就消失
  },
  tabStyle:{
   //fix minWidth会导致tabStyle初次加载时闪烁
    padding: 0
  },
  indicatorStyle:{
    height:2,
    backgroundColor:'white',
  },
  indicatorContainer: {
    alignItems: "center"
  },
  indicator: {
      color: 'red',
      margin: 10
  }
  
});
