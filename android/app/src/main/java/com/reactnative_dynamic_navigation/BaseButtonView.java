package com.reactnative_dynamic_navigation;

import android.content.Context;
import android.text.TextUtils;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.facebook.react.uimanager.events.EventDispatcher;


public class BaseButtonView extends LinearLayout implements  View.OnClickListener   {
    private Button btnSubmit, btnCancel;
    private TextView textView;
    private  EventDispatcher mEventDispatchers;
    public BaseButtonView(Context context, EventDispatcher mEventDispatcher){
        super(context);
        mEventDispatchers = mEventDispatcher;
        LinearLayout view = (LinearLayout) LayoutInflater.from(context).inflate(R.layout.bt_layout, this,true);
        btnSubmit = view.findViewById(R.id.btn_submit);
        btnCancel = view.findViewById(R.id.btn_cancel);
        textView = view.findViewById(R.id.text);
        btnCancel.setOnClickListener(this);
        btnSubmit.setOnClickListener(this);
    }

    public void setText(String text) {
        if (TextUtils.isEmpty(text)) {
            return;
        }
        textView.setText(text);
    }

    @Override
    public void onClick(View view) {
        Log.e("确认-->",view.getId()+"确认");

        switch (view.getId()){
          case R.id.btn_submit:
              Log.e("确认-->","确认");
              mEventDispatchers.dispatchEvent(
                      new RCTButton_ConfirmEvent(getId(), "确认"));
              break;
          case R.id.btn_cancel:
              Log.e("确认-->","取消");
              mEventDispatchers.dispatchEvent(
                      new RCTButton_ConcelEvent(getId(), "取消"));
              break;
           default:
               break;
      }
    }

}
