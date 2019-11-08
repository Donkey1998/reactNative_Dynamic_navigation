/**
 * 全局导航调整工具类
 */

export default class NavigationUtill {
  
    /**
     * 返回上一页
     * @param {*} navigation 
     */
   static goBack(navigation) {
       navigation.goBack();
   }
    /**
     * 重置到首页
     * @param {*}  
     */
   static resetToHomePage(params) {
    const {navigation} = params;
    navigation.navigate('Main');
   }
    /**
     * 跳转到指定页面
     * @param params  要传递的参数
     * @param page    要跳转的页面
     */
    static goPage(params,page) {
      const navigation = NavigationUtill.navigation;
      if(!navigation){
        console.log('NavigationUtill navigation can not be null');
        return;
      }
      navigation.navigate(
      page,
      {
        ...params
      });
  }
}
