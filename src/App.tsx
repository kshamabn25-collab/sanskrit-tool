import { useState, useCallback, useEffect } from "react";
import { writeText } from "@tauri-apps/plugin-clipboard-manager";
import { toIAST, fromPhonetic, PhoneticScheme, OutputScript } from "./transliterate";
import "./App.css";

const SCHEMES: { label: string; value: PhoneticScheme }[] = [
  { label: "ITRANS", value: "itrans" },
  { label: "HK", value: "hk" },
  { label: "SLP1", value: "slp1" },
];

const SCRIPTS: { label: string; value: OutputScript; native: string }[] = [
  { label: "Devanagari", value: "devanagari", native: "देव" },
  { label: "Kannada",    value: "kannada",    native: "ಕನ್ನ" },
  { label: "Telugu",     value: "telugu",     native: "తెలు" },
  { label: "Tamil",      value: "tamil",      native: "தமி" },
  { label: "Bengali",    value: "bengali",    native: "বাং" },
  { label: "Malayalam",  value: "malayalam",  native: "മലയ" },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(async () => {
    if (!text) return;
    await writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [text]);
  return (
    <button className={`copy-btn ${copied ? "copied" : ""}`} onClick={copy} disabled={!text}>
      {copied ? "✓" : "Copy"}
    </button>
  );
}

export default function App() {
  // Lipika section
  const [roman, setRoman] = useState("");
  const [scheme, setScheme] = useState<PhoneticScheme>("itrans");
  const [targetScript, setTargetScript] = useState<OutputScript>("devanagari");
  const scriptOutput = roman.trim() ? fromPhonetic(roman, scheme, targetScript) : "";

  // IAST section
  const [indic, setIndic] = useState("");
  const [iast, setIast] = useState("");

  useEffect(() => {
    setIast(indic.trim() ? toIAST(indic) : "");
  }, [indic]);

  return (
    <main className="app">
      <div className="header">
        <span className="app-icon">ॐ</span>
        <h1>Sanskrit Tool</h1>
      </div>

      {/* Lipika-style phonetic input */}
      <section className="lipika-section">
        <div className="section-label">Phonetic → Script</div>
        <textarea
          className="text-in"
          placeholder="Type phonetically… (e.g. namaskaara)"
          value={roman}
          onChange={e => setRoman(e.target.value)}
          spellCheck={false}
          rows={2}
        />
        <div className="controls-row">
          <div className="pill-group">
            {SCHEMES.map(s => (
              <button
                key={s.value}
                className={`pill ${scheme === s.value ? "active" : ""}`}
                onClick={() => setScheme(s.value)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
        <div className="script-selector">
          {SCRIPTS.map(sc => (
            <button
              key={sc.value}
              className={`script-btn ${targetScript === sc.value ? "active" : ""}`}
              onClick={() => setTargetScript(sc.value)}
              title={sc.label}
            >
              {sc.native}
            </button>
          ))}
        </div>
        <div className="result-row">
          <div className={`result-box indic-output ${scriptOutput ? "" : "empty"}`}>
            {scriptOutput || <span className="placeholder">output appears here</span>}
          </div>
          <CopyButton text={scriptOutput} />
        </div>
      </section>

      <div className="divider" />

      {/* IAST pop card */}
      <section className="iast-card">
        <div className="section-label">Indic → IAST</div>
        <textarea
          className="text-in iast-in"
          placeholder="Paste Indic text… (Devanagari, Kannada, Telugu, Tamil, Bengali, Malayalam)"
          value={indic}
          onChange={e => setIndic(e.target.value)}
          spellCheck={false}
          rows={2}
        />
        <div className="result-row">
          <div className={`result-box iast-output ${iast ? "" : "empty"}`}>
            {iast || <span className="placeholder">IAST output appears here</span>}
          </div>
          <CopyButton text={iast} />
        </div>
      </section>
    </main>
  );
}
