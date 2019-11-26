package com.reactnative_dynamic_navigation;

import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.IllegalViewOperationException;

public class RNManagerModule extends ReactContextBaseJavaModule {
    private Context mContext;
    public RNManagerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNManagerModule";
    }

    /**
     *
     * RN调用Android需要module名和方法名相同，而Android调用RN只需要方法名相同。
     * （1）RCTDeviceEventEmitter 事件方式
     * ​ 优点：可任意时刻传递，Android主导控制。 可以用于多线程
     * （2）Callback 回调方式
     * ​ 优点：JS调用，Android返回。
     * ​ 缺点：CallBack为异步操作，返回时机不确定
     * （3）Promise
     * ​ 优点：JS调用，Android返回。
     * ​ 缺点：每次使用需要JS调用一次
     * （4）直传常量数据（原生向RN）
     * ​ 跨域传值，只能从原生端向RN端传递。RN端可通过 NativeModules.[module名].[参数名] 的方式获取。
     *
     * 注意：RN层调用NativeModule层进行界面跳转时，需要设置FLAG_ACTIVITY_NEW_TASK标志
     *
     * 作者：闲庭CC
     * 链接：https://www.jianshu.com/p/79edec250158
     * 来源：简书
     * 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
     */

    @ReactMethod
    public void RNDeviceEvent() {
        sendEventToRn("sendEventToRn");
    }

    private void sendEventToRn(String eventName) {
        if (getReactApplicationContext() == null) {
            return;
        }
        getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName,"data");
    }

    private  int i ;

    @ReactMethod
    public void  RNThreadDeviceEvent(){
        new Thread(new Runnable() {
            @Override
            public void run() {
                for ( i=0 ; i<=10;i++) {
                    try {
                        Thread.sleep(1000); // 模拟耗时操作
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    Log.e("线程输出的值", i+"");
                    if(i==10){
                        getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                                .emit("sendThreadDeviceEvent",i);
                    }
                }
            }
        }).start();
    }

//    RN调用Android Toast
    @ReactMethod
    public void RNToast(String msg){

        Toast.makeText(mContext,msg,Toast.LENGTH_SHORT).show();

    }

//    RN调用android Activity
//    参考链接 https://www.jianshu.com/p/e413e84cd28b
    @ReactMethod
    public void RNActivity(){
        Intent intent = new Intent(mContext,RnActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);    //一定要加上这句
        mContext.startActivity(intent);
    }

//    RN用Promise机制与安卓原生代码通信
    @ReactMethod
    public void RNPromise(String msg, Promise promise){
        Toast.makeText(mContext,msg,Toast.LENGTH_SHORT).show();

        String componentName = msg;
        promise.resolve(componentName);
    }

//    RN用callback回调方式与安卓原生代码通信
    @ReactMethod
    public void RNCallback(Callback errorCallback, Callback successCallback){
        try {
            successCallback.invoke("成功的回调"); //调用回调函数，返回结果
        }catch (IllegalViewOperationException e){
            errorCallback.invoke("失败的回调");
        }
    }


}