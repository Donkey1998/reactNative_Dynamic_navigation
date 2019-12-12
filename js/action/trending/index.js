import Types from '../types';
import DataStore, {FLAG_STORAGE} from '../../expand/dao/DataStore'

export function onRefreshTrending(storeName,url,pageSize){
    return dispatch =>{
        dispatch({type:Types.TRENDING_REFRESH, storeName: storeName});
        console.log('debug-->','刷新');
        let dataStore = new DataStore();
        dataStore.fetchData(url,FLAG_STORAGE.flag_trending)
            .then(data=>{
                handleData(dispatch,storeName,data,pageSize);
            })
            .catch(error =>{
                console.log('debug-->','失败');
                console.log('类型--》',error);
                dispatch({
                    type:Types.LOAD_TRENDING_FAIL,
                    storeName:storeName,
                    error
                })
            })
    }
}

/**
 * 加载更多
 * @param storeName
 * @param pageIndex 第几页
 * @param pageSize 每页展示条数
 * @param dataArray 原始数据
 * @param callBack 回调函数，可以通过回调函数来向调用页面通信：比如异常信息的展示，没有更多等待
 * @param favoriteDao
 * @returns {function(*)}
 */
export function onLoadMoreTrending(storeName, pageIndex, pageSize, dataArray = [], callBack) {
    return dispatch => {
        setTimeout(() => {//模拟网络请求
            if ((pageIndex - 1) * pageSize >= dataArray.length) {//已加载完全部数据
                if (typeof callBack === 'function') {
                    callBack('no more')
                }
                dispatch({
                    type: Types.TRENDING_LOAD_MORE_FAIL,
                    error: 'no more',
                    storeName: storeName,
                    pageIndex: --pageIndex,
                })
            } else {
                //本次和载入的最大数量
                let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
                dispatch({
                    type: Types.TRENDING_LOAD_MORE_SUCCESS,
                    storeName,
                    pageIndex,
                    projectModels: dataArray.slice(0, max),
                })
               
            }
        }, 500);
    }
}

function handleData(dispatch,storeName,data,pageSize) {
    console.log('类型--》',storeName);
    console.log('debug-->','成功');
    let fixItems =[];
    if(data && data.data){
        fixItems = data.data
    }
    dispatch({
        type:Types.LOAD_TRENDING_SUCCESS,
        items:fixItems,
        storeName:storeName,
        projectModels:pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize),//第一次要加载的数据
        pageIndex:1
    })
}