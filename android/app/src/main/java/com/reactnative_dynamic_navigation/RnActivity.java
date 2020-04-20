package com.reactnative_dynamic_navigation;

import android.app.Activity;
import android.content.Intent;
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
        Intent returnIntent = new Intent();
        returnIntent.putExtra("result", "RNActivity返回的数据");
        setResult(Activity.RESULT_OK, returnIntent);
        finish();
    }
}
