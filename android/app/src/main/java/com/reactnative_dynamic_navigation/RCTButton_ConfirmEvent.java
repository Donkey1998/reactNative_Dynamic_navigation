package com.reactnative_dynamic_navigation;

import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.RCTEventEmitter;

/**
 * Created by Andy on 2017/2/7.
 */

public class RCTButton_ConfirmEvent extends Event<RCTButton_ConfirmEvent> {

    public static final String EVENT_NAME = "RCTButtonConfirmEvent";

    private final String myValue;

    protected RCTButton_ConfirmEvent(int viewTag, String value) {
        super(viewTag);
        myValue = value;
    }

    @Override
    public String getEventName() {
        return EVENT_NAME;
    }

    @Override
    public void dispatch(RCTEventEmitter rctEventEmitter) {
        Log.e("-->","确认1");
        rctEventEmitter.receiveEvent(getViewTag(), getEventName(), serializeEventData());
    }

    private WritableMap serializeEventData() {
        WritableMap eventData = Arguments.createMap();
        eventData.putString("data", myValue);
        return eventData;
    }
}