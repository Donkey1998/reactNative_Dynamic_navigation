package com.reactnative_dynamic_navigation;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.RCTEventEmitter;

/**
 * Created by Andy on 2017/2/7.
 */

public class RCTButton_ConcelEvent extends Event<RCTButton_ConcelEvent> {

    public static final String EVENT_NAME = "RCTButton_ConcelEvent";

    private final String myValue;

    protected RCTButton_ConcelEvent(int viewTag, String value) {
        super(viewTag);
        myValue = value;
    }

    @Override
    public String getEventName() {
        return EVENT_NAME;
    }

    @Override
    public void dispatch(RCTEventEmitter rctEventEmitter) {
        rctEventEmitter.receiveEvent(getViewTag(), getEventName(), serializeEventData());
    }

    private WritableMap serializeEventData() {
        WritableMap eventData = Arguments.createMap();
        eventData.putString("data", myValue);
        return eventData;
    }
}