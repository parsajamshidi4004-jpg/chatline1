package com.chatline.app;

import android.app.Activity;
import android.view.WindowManager;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "ScreenGuard")
public class ScreenGuardPlugin extends Plugin {

    private void lock() {
        final Activity a = getActivity();
        if (a == null) return;
        a.runOnUiThread(new Runnable() {
            @Override public void run() {
                a.getWindow().setFlags(WindowManager.LayoutParams.FLAG_SECURE, WindowManager.LayoutParams.FLAG_SECURE);
            }
        });
    }

    @Override public void load() { lock(); }

    @PluginMethod public void setSecure(PluginCall call) { lock(); call.resolve(); }

    @PluginMethod public void enableDetection(PluginCall call) { lock(); call.resolve(); }
}
