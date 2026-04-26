#!/usr/bin/env bash
set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$SCRIPT_DIR/.."
DIST="$ROOT/Distribute"

mkdir -p "$DIST"

echo "Compiling installer.applescript → Install Script Tool.app ..."
osacompile -o "$DIST/Install Script Tool.app" "$SCRIPT_DIR/installer.applescript"
echo "Done: $DIST/Install Script Tool.app"
