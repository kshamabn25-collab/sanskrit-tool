import Sanscript from "@indic-transliteration/sanscript";

// Scheme name strings (as used by sanscript.js)
const DEVANAGARI = "devanagari";
const IAST = "iast";
const ITRANS = "itrans";
const HK = "hk";
const SLP1 = "slp1";

// Unicode block ranges mapped to scheme names
const SCRIPT_RANGES: Array<[number, number, string]> = [
  [0x0900, 0x097f, DEVANAGARI],
  [0x0980, 0x09ff, "bengali"],
  [0x0b80, 0x0bff, "tamil"],
  [0x0c00, 0x0c7f, "telugu"],
  [0x0c80, 0x0cff, "kannada"],
  [0x0d00, 0x0d7f, "malayalam"],
];

export type PhoneticScheme = "itrans" | "hk" | "slp1";
export type OutputScript = "devanagari" | "kannada" | "telugu" | "tamil" | "bengali" | "malayalam";

const SCHEME_MAP: Record<PhoneticScheme, string> = {
  itrans: ITRANS,
  hk: HK,
  slp1: SLP1,
};

const OUTPUT_SCRIPT_MAP: Record<OutputScript, string> = {
  devanagari: "devanagari",
  kannada: "kannada",
  telugu: "telugu",
  tamil: "tamil",
  bengali: "bengali",
  malayalam: "malayalam",
};

export function detectScript(text: string): string | null {
  const counts: Record<string, number> = {};
  for (const ch of text) {
    const cp = ch.codePointAt(0) ?? 0;
    for (const [lo, hi, name] of SCRIPT_RANGES) {
      if (cp >= lo && cp <= hi) {
        counts[name] = (counts[name] ?? 0) + 1;
        break;
      }
    }
  }
  let best: string | null = null;
  let bestCount = 0;
  for (const [script, count] of Object.entries(counts)) {
    if (count > bestCount) {
      bestCount = count;
      best = script;
    }
  }
  return best;
}

export function toIAST(text: string): string {
  const script = detectScript(text);
  if (!script) return text;
  return Sanscript.t(text, script, IAST);
}

export function fromPhonetic(text: string, scheme: PhoneticScheme = "itrans", targetScript: OutputScript = "devanagari"): string {
  return Sanscript.t(text, SCHEME_MAP[scheme], OUTPUT_SCRIPT_MAP[targetScript]);
}
