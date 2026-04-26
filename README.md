# Script Tool

A free, offline menu-bar app for typing Sanskrit and other Indic scripts — works in any app on your Mac.

## Features

- **Sanskrit IME** — type phonetic Roman in *any* app (WhatsApp, Notion, Word, browser) and get Devanagari inserted directly, no copy-paste needed
- **7 output scripts** — Devanagari, Kannada, Telugu, Tamil, Bengali, Malayalam, IAST
- **3 input schemes** — ITRANS, Harvard-Kyoto (HK), SLP1
- **Quick converter panel** — floating panel for one-off conversions
- **Full converter window** — side-by-side phonetic → script + IAST view
- Lives in your menu bar, works 100% offline

## Download & Install

👉 **[Go to Releases](https://github.com/kshamabn25-collab/script-tool/releases/latest)** to download.

**macOS:**
1. Download `Script Tool.app` and `Install Script Tool.app`
2. Put both files in the same folder
3. Double-click **Install Script Tool.app** — it copies the app to your Applications folder automatically. No Terminal needed.
4. On first launch, macOS will ask you to grant **Accessibility permission** (required for the IME to intercept keystrokes). Go to **System Settings → Privacy & Security → Accessibility** and enable Script Tool.

> If macOS says "cannot be verified", right-click the installer → Open → Open.

**Windows:** Download the `.msi` installer and run it.

## Keyboard Shortcuts

### Global (work from any app, always active)

| Action | Shortcut |
|--------|----------|
| Open converter window | `Alt+Shift+I` |
| Open quick panel | `Alt+Shift+S` |
| Toggle Sanskrit IME on/off | `Alt+Shift+M` |

### While Sanskrit IME is active

| Action | Shortcut |
|--------|----------|
| Switch to ITRANS scheme | `Alt+Shift+1` |
| Switch to Harvard-Kyoto scheme | `Alt+Shift+2` |
| Switch to SLP1 scheme | `Alt+Shift+3` |
| Cycle output script | `Alt+Shift+O` |
| Commit word + space | `Space` |
| Commit word + newline | `Enter` |
| Delete last phonetic character | `Backspace` |
| Cancel and exit IME | `Escape` |

You can also switch input scheme and output script any time from the **tray menu**.

## How to Use the Sanskrit IME

1. Press **Alt+Shift+M** → a small status bar appears at the top of your screen showing `ITRANS ▶ Active`
2. Click in any text field in any app
3. Type phonetic Sanskrit (e.g. `namaskaara`) — keystrokes are intercepted and shown in the status bar
4. Press **Space** → `नमस्कार ` is inserted into the text field
5. Continue typing the next word
6. Press **Alt+Shift+M** again (or **Escape**) to turn off IME mode

### ITRANS quick reference

| Type | Gets |
|------|------|
| `a aa i ii u uu` | `अ आ इ ई उ ऊ` |
| `k kh g gh` | `क ख ग घ` |
| `T Th D Dh N` | `ट ठ ड ढ ण` |
| `sh Sh s h` | `श ष स ह` |
| `R RR` | `ऋ ॠ` |
| `M H` | `ं ः` |

Full ITRANS reference: [ITRANS manual](http://www.sanskritweb.net/itrans/)

## About

Made by [Kshama](https://www.kshama.co.in/) — a researcher and practitioner passionate about making Sanskrit and Indic knowledge accessible to everyone.

☕ [Support this project](https://www.buymeacoffee.com/kshama)
