import Types from '../../action/types'

const initState = {
   
}

export default function onAction (state = initState, action ){
    switch(action.type){
        case Types.LOAD_POPULAR_SUCCESS://下拉刷新成功
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    items: action.items,//原始数据
                    projectModels: action.projectModels,//此次要展示的数据
                    isLoading: false,
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex
                }
            };
        case Types.POPULAR_REFRESH://下拉刷新
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: true,
                    hideLoadingMore: true,
                }
            }
        case Types.LOAD_POPULAR_FAIL:
                return {
                    ...state,
                    [action.storeName]: {
                        ...state[action.storeName],
                        isLoading: false,
                    }
                }
        case Types.POPULAR_LOAD_MORE_SUCCESS:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModels: action.projectModels,
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex,
                }
            }
        case Types.POPULAR_LOAD_MORE_FAIL://上拉加载更多失败
        return {
            ...state,//Object.assign @http://www.devio.org/2018/09/09/ES6-ES7-ES8-Feature/
            [action.storeName]: {
                ...state[action.storeName],
                hideLoadingMore: true,
                pageIndex: action.pageIndex,
            }
        };
        default:
            return state;
        
    }
}