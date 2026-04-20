#!/bin/bash

# Find the .app sitting next to this script
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
APP_NAME="Sanskrit Tool.app"
APP_SRC="$SCRIPT_DIR/src-tauri/target/release/bundle/macos/$APP_NAME"
APP_DEST="/Applications/$APP_NAME"

# ── Check the .app exists ──────────────────────────────────────────────────────
if [ ! -d "$APP_SRC" ]; then
  osascript -e 'display alert "Sanskrit Tool not found" message "Could not find Sanskrit Tool.app. Please make sure this script is in the Sanskrit Tool project folder." as critical'
  exit 1
fi

# ── Copy to /Applications ──────────────────────────────────────────────────────
osascript -e 'display notification "Installing Sanskrit Tool…" with title "Sanskrit Tool Installer"'

cp -R "$APP_SRC" "$APP_DEST" 2>/dev/null || {
  # Need admin rights to write to /Applications
  osascript -e "do shell script \"cp -R '$APP_SRC' '/Applications/'\" with administrator privileges"
}

# ── Remove macOS quarantine flag (so Gatekeeper doesn't block it) ─────────────
xattr -cr "$APP_DEST" 2>/dev/null || \
  osascript -e "do shell script \"xattr -cr '/Applications/Sanskrit Tool.app'\" with administrator privileges" 2>/dev/null

# ── Launch the app ─────────────────────────────────────────────────────────────
open "$APP_DEST"

# ── Done ───────────────────────────────────────────────────────────────────────
osascript -e 'display alert "Sanskrit Tool installed!" message "Sanskrit Tool is now in your Applications folder and running in the menu bar.

Next step: go to System Settings → Privacy & Security → Accessibility, and turn on Sanskrit Tool. This lets it replace text in other apps.

Hotkeys:
  ⌘ Shift I  →  Convert selected Indic text to IAST
  ⌘ Shift D  →  Open phonetic input panel" as informational buttons {"Got it"}'
