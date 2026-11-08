package com.webapp.chatline;

import android.app.Activity;
import android.view.WindowManager;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "ScreenGuard")
public class ScreenGuardPlugin extends Plugin {

    private void secure(final boolean on) {
        final Activity a = getActivity();
        if (a == null) return;
        a.runOnUiThread(new Runnable() {
            @Override public void run() {
                if (on) a.getWindow().addFlags(WindowManager.LayoutParams.FLAG_SECURE);
                else a.getWindow().clearFlags(WindowManager.LayoutParams.FLAG_SECURE);
            }
        });
    }

    // off by default: nothing is blocked until the user turns the option on for a chat
    @Override public void load() { secure(false); }

    @PluginMethod public void setSecure(PluginCall call) {
        Boolean on = call.getBoolean("on", false);
        secure(on != null && on);
        call.resolve();
    }

    @PluginMethod public void enableDetection(PluginCall call) { call.resolve(); }
}
