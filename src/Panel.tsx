import { useState, useRef, useEffect, useCallback } from "react";
import { invoke } from "@tauri-apps/api/core";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { fromPhonetic, PhoneticScheme } from "./transliterate";
import "./Panel.css";

const SCHEMES: { label: string; value: PhoneticScheme }[] = [
  { label: "ITRANS", value: "itrans" },
  { label: "Harvard-Kyoto", value: "hk" },
  { label: "SLP1", value: "slp1" },
];

export default function Panel() {
  const [input, setInput] = useState("");
  const [scheme, setScheme] = useState<PhoneticScheme>("itrans");
  const inputRef = useRef<HTMLInputElement>(null);

  const preview = input.trim() ? fromPhonetic(input, scheme) : "";

  // Clear and focus every time the window becomes visible
  useEffect(() => {
    const win = getCurrentWindow();
    const unlisten = win.onFocusChanged(({ payload: focused }) => {
      if (focused) {
        setInput("");
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    });
    // Also focus immediately on mount
    setTimeout(() => inputRef.current?.focus(), 50);
    return () => { unlisten.then(f => f()); };
  }, []);

  const handleConfirm = useCallback(async () => {
    if (!preview) return;
    await invoke("confirm_panel_paste", { text: preview });
    setInput("");
  }, [preview]);

  const handleClose = useCallback(async () => {
    setInput("");
    await invoke("close_panel");
  }, []);

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter") { e.preventDefault(); await handleConfirm(); }
    if (e.key === "Escape") { e.preventDefault(); await handleClose(); }
  };

  return (
    <div className="panel">
      <div className="panel-top">
        <select
          value={scheme}
          onChange={(e) => setScheme(e.target.value as PhoneticScheme)}
          className="scheme-select"
        >
          {SCHEMES.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
        <span className="panel-hint">Type phonetic text</span>
        {/* mousedown fires before the input loses focus, so close_panel gets called reliably */}
        <button
          className="close-btn"
          onMouseDown={(e) => { e.preventDefault(); handleClose(); }}
          title="Close (Esc)"
        >✕</button>
      </div>

      <input
        ref={inputRef}
        className="panel-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="e.g. namaH"
        spellCheck={false}
      />

      <div className="panel-preview">
        {preview ? (
          <>
            <span className="arrow">→</span>
            <span className="devanagari">{preview}</span>
          </>
        ) : (
          <span className="placeholder">Devanagari preview appears here</span>
        )}
      </div>

      <div className="panel-footer">
        <span>↵ Enter to paste · Esc to close</span>
        {preview && (
          <button
            className="paste-btn"
            onMouseDown={(e) => { e.preventDefault(); handleConfirm(); }}
          >Paste ↵</button>
        )}
      </div>
    </div>
  );
}
