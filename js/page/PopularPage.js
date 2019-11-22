

import React, { PureComponent } from 'react';
import {Platform, StyleSheet, ActivityIndicator,Text, View, FlatList, RefreshControl} from 'react-native';
import NavigationUtill from '../navigator/NavigationUtill';
import {createMaterialTopTabNavigator,createAppContainer} from 'react-navigation';
import {connect} from 'react-redux';
import actions from '../action';
import PopularItem from '../common/PopularItem';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';//搜索的排序规则 我们按照点赞量排序
const ThemeColor = 'red';
const pageSize = 10;//设为常量，防止修改
export default class PopularPage extends PureComponent {
  constructor(props){
    super(props);
    console.disableYellowBox = true;
    this.tabNames =['Python','Java','C','JavaScript'];
  }

  _getTabs(){
    const tabs ={};
    this.tabNames.forEach((item,index)=>{
      tabs[`tab${index}`]={
        // 往PopularTab界面传递数据
        screen:props => <PopularTabPage {...props} tabLabel = {item}/>,
        navigationOptions:{
          title: item
        }
      }
    })
    return tabs;
  }

  // _TabNavigator () {
  //   return createMaterialTopTabNavigator({
  //     PopularTab1: {
  //       screen: PopularTab,
  //       navigationOptions:{
  //         title: '最热',
  //        }
  //       },
  //     PopularTab2: {
  //       screen: PopularTab,
  //       navigationOptions:{
  //         title: '最热',
  //         }
  //       }
  //     });
  //   }

  _TabNavigator () {
    return createMaterialTopTabNavigator(
      this._getTabs(),{
        tabBarOptions:{
          tabStyle:styles.tabStyle,
          upperCaseLabel: false, //是否使标签大写 默认为true
          scrollEnabled:true, //是否支持啊选项卡滚动 默认为 false
          style:{
            backgroundColor:'#678',//TabBar的背景色
            // height: 50//fix 开启scrollEnabled后再Android上初次加载时闪烁问题
          },
          indicatorStyle:styles.indicatorStyle, //标签指示器的样式
          labelStyle:styles.labelStyle,//文字的样式
        },
        lazy: true  //  true，则仅在使选项卡处于活动状态或快速扫视时才显示它们。 如果false，则所有选项卡都将立即呈现。
      }
      );
    }

    render() {
      const Tab = createAppContainer(this._TabNavigator());

      return(
        <View style={{flex:1}}>
          <Tab/>
        </View>
      );
      
      
    }
}

class PopularTab extends PureComponent {
  constructor(props) {
    super(props);
    const {tabLabel} = this.props;
    this.storeName = tabLabel;
    
  }
  
  componentDidMount(){
    this.loadData();
  }

  loadData(loadMore){
    const {onRefreshPopular, onLoadMorePopular,} = this.props;
        const store = this._store();
        const url = this.genFetchUrl(this.storeName);
        if (loadMore) {
            onLoadMorePopular(this.storeName, ++store.pageIndex, pageSize, store.items,callback=>{
              console.log('没有更多了')
            })
        }  else {
            onRefreshPopular(this.storeName, url, pageSize);
        }
  }


  /**
     * 获取与当前页面有关的数据
     * @returns {*}
     * @private
     */
    _store() {
      const {popular} = this.props;
      let store = popular[this.storeName];
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
    return URL + key + QUERY_STR;
  }

  renderItem = ({index, item}) => {
    return (
      <PopularItem
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
    return (
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
    popular: state.popular 
});

const mapDispatchToProps = dispatch =>({
  onRefreshPopular: (storeName, url, pageSize,) => dispatch(actions.onRefreshPopular(storeName, url, pageSize)),
  onLoadMorePopular: (storeName, pageIndex, pageSize, items,  callBack) => dispatch(actions.onLoadMorePopular(storeName, pageIndex, pageSize, items, callBack)),
})

const PopularTabPage = connect(mapStateToPorps,mapDispatchToProps)(PopularTab);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  tabStyle:{
    minWidth: 50 ,//fix minWidth会导致tabStyle初次加载时闪烁
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
