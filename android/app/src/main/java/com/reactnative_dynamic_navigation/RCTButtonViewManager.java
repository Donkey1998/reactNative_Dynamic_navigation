package com.reactnative_dynamic_navigation;

import android.support.annotation.Nullable;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.EventDispatcher;

import java.util.Map;

import javax.annotation.Nonnull;

public class RCTButtonViewManager extends SimpleViewManager<BaseButtonView>{

    private ReactContext reactContext ;

    @Nonnull
    @Override
    public String getName() {
        return "AndroidRCTButtonView";
    }

    @Override
    public Map getExportedCustomDirectEventTypeConstants() {

        return MapBuilder.<String, Object>builder()
                .put(RCTButton_ConfirmEvent.EVENT_NAME, MapBuilder.of("registrationName", "onButtonConfirm"))
                .put(RCTButton_ConcelEvent.EVENT_NAME, MapBuilder.of("registrationName", "onButtonCancel"))
                .build();
    }

    @Nonnull
    @Override
    protected BaseButtonView createViewInstance(@Nonnull ThemedReactContext context) {
        reactContext = context;
        EventDispatcher mEventDispatcher = reactContext.getNativeModule(UIManagerModule.class).getEventDispatcher();
        return new BaseButtonView(context, mEventDispatcher);
    }

    @ReactProp(name = "title")
    public void setTitlel( BaseButtonView view, @Nullable String title) {
        if (reactContext.getCurrentActivity() == null) return;
        reactContext.getCurrentActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if(view!=null){
                    view.setText(title);
                }
            }
        });
    }

}
