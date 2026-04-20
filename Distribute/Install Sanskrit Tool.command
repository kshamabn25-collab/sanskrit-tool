#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
APP_SRC="$SCRIPT_DIR/Sanskrit Tool.app"
APP_DEST="/Applications/Sanskrit Tool.app"

if [ ! -d "$APP_SRC" ]; then
  osascript -e 'display alert "Sanskrit Tool not found" message "Make sure Sanskrit Tool.app is in the same folder as this installer." as critical'
  exit 1
fi

osascript -e 'display notification "Installing Sanskrit Tool…" with title "Sanskrit Tool Installer"'

cp -R "$APP_SRC" "$APP_DEST" 2>/dev/null || \
  osascript -e "do shell script \"cp -R '$APP_SRC' '/Applications/'\" with administrator privileges"

xattr -cr "$APP_DEST" 2>/dev/null || \
  osascript -e "do shell script \"xattr -cr '/Applications/Sanskrit Tool.app'\" with administrator privileges" 2>/dev/null

open "$APP_DEST"

osascript -e 'display alert "Sanskrit Tool installed!" message "Sanskrit Tool is now running in your menu bar.

One-time setup:
  System Settings → Privacy & Security → Accessibility
  → Turn on Sanskrit Tool

Hotkeys:
  Option + Shift + I  to convert selected text to IAST
  Option + Shift + D  to open phonetic typing panel" as informational buttons {"Got it"}'
