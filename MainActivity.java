package com.webapp.chatline;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(ScreenGuardPlugin.class);
        super.onCreate(savedInstanceState);
        // FLAG_SECURE is NOT set here any more: screenshots are blocked only while the web app asks for it (setSecure on:true)
    }
}
