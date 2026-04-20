use std::sync::Mutex;
use tauri::{
    menu::{Menu, MenuItem},
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent},
    AppHandle, Manager,
};
use tauri_plugin_global_shortcut::ShortcutState;

struct _Unused(Mutex<()>); // keeps manage() happy

fn open_main_window(app: &AppHandle) {
    if let Some(win) = app.get_webview_window("main") {
        let _ = win.show();
        let _ = win.set_focus();
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .manage(_Unused(Mutex::new(())))
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            #[cfg(desktop)]
            {
                use tauri_plugin_global_shortcut::GlobalShortcutExt;

                // ⌥+Shift+I → open converter window on IAST tab
                let h1 = app.handle().clone();
                app.global_shortcut().on_shortcut("Alt+Shift+I", move |_a, _s, ev| {
                    if ev.state() == ShortcutState::Pressed {
                        open_main_window(&h1);
                    }
                })?;

                // ⌥+Shift+D → open converter window on phonetic tab
                let h2 = app.handle().clone();
                app.global_shortcut().on_shortcut("Alt+Shift+D", move |_a, _s, ev| {
                    if ev.state() == ShortcutState::Pressed {
                        open_main_window(&h2);
                    }
                })?;
            }

            let open_item = MenuItem::with_id(app, "open", "Open Sanskrit Tool", true, None::<&str>)?;
            let quit_item = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;
            let menu = Menu::with_items(app, &[&open_item, &quit_item])?;

            TrayIconBuilder::new()
                .menu(&menu)
                .show_menu_on_left_click(false)
                .icon(app.default_window_icon().unwrap().clone())
                .on_menu_event(|app, event| match event.id.as_ref() {
                    "open" => open_main_window(app),
                    "quit" => app.exit(0),
                    _ => {}
                })
                .on_tray_icon_event(|tray, event| {
                    // Left-click on tray icon opens the converter
                    if let TrayIconEvent::Click {
                        button: MouseButton::Left,
                        button_state: MouseButtonState::Up, ..
                    } = event {
                        open_main_window(tray.app_handle());
                    }
                })
                .build(app)?;

            // Hide main window on startup; user opens via tray or hotkey
            if let Some(win) = app.get_webview_window("main") {
                let _ = win.hide();
            }

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
