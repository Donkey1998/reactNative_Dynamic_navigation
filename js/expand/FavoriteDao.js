import {
    AsyncStorage,
} from 'react-native';
const FAVORITE_KEY_PREFIX = 'favorite_';
const FAVORITE_OBJECT_KEY = 'favorite_object_'

export default class FavoriteDao {
    constructor(flag) {
        this.favoriteKey = FAVORITE_KEY_PREFIX + flag;
        this.favoriteObjectKey = FAVORITE_OBJECT_KEY + flag;
    }
     /**
     * 更新 所有收藏项目的key
     * @param key
     * @param isAdd true 添加,false 删除
     * **/
    updateFavoriteKeys(isAdd,key,value) {
        AsyncStorage.getItem(this.favoriteKey, (error, result) => {
            if (!error) {
                let favoriteKeys = [];
                if (result) {
                    favoriteKeys = JSON.parse(result);
                }
                let index = favoriteKeys.indexOf(key);
                if (isAdd) {//如果是添加且key不在存在则添加到数组中
                    if (index === -1) favoriteKeys.push(key);
                    this.updateFavoriteObject(isAdd,key,value);

                } else {//如果是删除且key存在则将其从数值中移除
                    if (index !== -1) favoriteKeys.splice(index, 1);
                    this.updateFavoriteObject(isAdd,key,value);
                }
                AsyncStorage.setItem(this.favoriteKey, JSON.stringify(favoriteKeys));//将更新后的key集合保存到本地
            }
        });
    }


    /**
     * 获取所有收藏项目的key
     * @return {Promise}
     */
    getFavoriteKeys() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(this.favoriteKey, (error, result) => {
                if (!error) {
                    try {
                        console.log('所有收藏的key-->1',JSON.parse(result));
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(error);
                    }
                } else {
                    reject(error);
                }
            });
        });
    }

    /**
     * 获取所有收藏项目的json对象
     * @returns
     */
    getFavoriteObject() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(this.favoriteObjectKey, (error, result) => {
                if (!error) {
                    try {
                        console.log('所有收藏的项目-->2',JSON.parse(result));
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(error);
                    }
                } else {
                    reject(error);
                }
            });
        });
    }
    
    /**
     *更新收藏对象
     * @param {*} isAdd  true添加收藏 false取消收藏
     * @param {*} key    
     * @param {*} value
     * @memberof FavoriteDao
     */
    updateFavoriteObject(isAdd, key, value) {
        AsyncStorage.getItem(this.favoriteObjectKey, (error, result) => {
            if (!error) {
                let favoriteObject = [];
                if (result) {
                    favoriteObject = JSON.parse(result);
                    console.log('所有收藏的项目-->4',JSON.parse(result));
                }
                let obj = {};
                obj[key] = value;
                console.log('所有收藏的项目-->7',obj);
                let index = favoriteObject.indexOf(obj);
                console.log('所有收藏的项目-->8',index);
                if (isAdd) {//如果是添加且key不在存在则添加到数组中
                    favoriteObject.push(obj);  
                } else {//如果是删除且key存在则将其从数值中移除
                    favoriteObject.splice(index, 1);
                }
                console.log('所有收藏的项目-->6',favoriteObject);
                AsyncStorage.setItem(this.favoriteObjectKey, JSON.stringify(favoriteObject));//将更新后的key集合保存到本地
            }
        });
    }

}