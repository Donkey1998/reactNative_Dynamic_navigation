package com.reactnative_dynamic_navigation;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;

public class RnActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_rn);
    }

    public void onBack(View view) {
        finish();
    }
}
