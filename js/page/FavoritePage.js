

import React, {PureComponent,Component} from 'react';
import {StyleSheet, ActivityIndicator,Text, View, FlatList, RefreshControl, TouchableOpacity,DeviceEventEmitter} from 'react-native';
import NavigationUtill from '../navigator/NavigationUtill'
import {createMaterialTopTabNavigator,createAppContainer} from 'react-navigation';
import NavigationBar from '../common/NavigationBar'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FLAG_STORAGE} from '../expand/dao/DataStore';
import {device} from '../DeviceUtill';
import FavoriteDao from '../expand/FavoriteDao';
import TrendingItem from '../common/TrendingItem';
import PopularItem from '../common/PopularItem';


const ThemeColor = 'red';

export default class FavoritePage extends PureComponent {
  constructor(props){
    super(props);
    console.disableYellowBox = true;
  }

  _getTabs(){
    const tabs = {
      'Popular': {
          screen: props => <FavoriteTabPage {...props} flag={FLAG_STORAGE.flag_popular} theme={ThemeColor}/>,//初始化Component时携带默认参数 @https://github.com/react-navigation/react-navigation/issues/2392
          navigationOptions: {
              title: '最热',
          },
      },
      'Trending': {
          screen: props => <FavoriteTabPage {...props} flag={FLAG_STORAGE.flag_trending} theme={ThemeColor}/>,//初始化Component时携带默认参数 @https://github.com/react-navigation/react-navigation/issues/2392
          navigationOptions: {
              title: '趋势',
          },
      },
    }
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
            height: 50,//fix 开启scrollEnabled后再Android上初次加载时闪烁问题
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

    renderTitleView() {
      return <View>
          <TouchableOpacity
              underlayColor='transparent'
              onPress={() => this.dialog.show()}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{
                      fontSize: 18,
                      color: '#FFFFFF',
                      fontWeight: '400'
                  }}>收藏</Text>
              </View>
          </TouchableOpacity>
      </View>
  }

  render(){
    const Tab = createAppContainer(this._TabNavigator());
      return(
        <View style={{flex:1}}>
          <NavigationBar
          titleView={this.renderTitleView()}
          statusBar={{backgroundColor: ThemeColor, barStyle: 'light-content',}}
          style={{backgroundColor: ThemeColor}}
          rightButton={this.renderRightButton()}
          />
          <Tab/>
        </View>
      );  
    }
}
 

class FavoriteTabPage extends Component {
  constructor(props) {
    super(props);
    this.favoriteDao = new FavoriteDao(this.props.flag);
    this.flag = this.props.flag
    this.projectModels = [];
    this.state={
      flatlistdata:[],
      isLoading:false,
    }
  }

  componentWillMount(){
    this.favoriteDao.getFavoriteObject().then((result)=>{
      console.log('所有收藏的项目-->3',result);
      this.projectModels = result;
      this.setState({
        flatlistdata:this.projectModels
      });
      // this.forceUpdate();
      console.log('所有收藏的项目-->5',this.projectModels);
    }).catch((e) => {
        reject(e);
    })

  }

  renderItem = ({index, item}) => {
    const Item = this.flag === FLAG_STORAGE.flag_popular ? PopularItem : TrendingItem;
    return (
      <Item
        item = {item}
        onSelect={(callback) => {
          NavigationUtill.goPage({
              projectModel: item,
              callback,
          }, 'DetailPage')
        }}
        isFavorite={true}
        onPressFavorite={(isFavorite,itemData)=>{this.onPressFavorite(isFavorite,itemData)}}
      />
    );
  }


  onPressFavorite(isFavorite,itemData){
    // 更新数据库所有收藏项目的key值
    this.favoriteDao.updateFavoriteKeys(isFavorite,itemData.fullName,itemData);
  }

  loadData(){
    this.setState({
      isLoading: true
    });
    this.favoriteDao.getFavoriteObject().then((result)=>{
      this.setState({
        isLoading: false
      });
      console.log('所有收藏的项目-->3',result);
      this.projectModels = result;
      this.setState({
        flatlistdata:this.projectModels
      });
      // this.forceUpdate();
      console.log('所有收藏的项目-->5',this.projectModels);
    }).catch((e) => {
        this.setState({
          isLoading: false
        });
        reject(e);
    })
  }

  render(){
    console.log('所有收藏的项目-->4',this.projectModels);
    return(
      <View style={styles.container}>
       <FlatList
          data={this.state.flatlistdata}
          renderItem={({ index, item }) => this.renderItem({ index, item })}
          keyExtractor={(item, index) => {
            return index;
          }}
          refreshControl={
            <RefreshControl
              titleColor={'reg'}
              colors={['#00ff00']}
              refreshing={this.state.isLoading}
              onRefresh={() => this.loadData()}
              tintColor={'reg'}
            />
          }
       />
    </View>
    ); 
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // 修复loding图标第一次加载闪一下就消失
  },
  tabStyle:{
   //fix minWidth会导致tabStyle初次加载时闪烁
    padding: 0,
    width: device.width/2
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
  },
  labelStyle: {
    fontSize: 15,  
    alignItems: "center",
    justifyContent: 'center',
},
  
});
