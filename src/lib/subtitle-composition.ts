import type { SubtitleStyle } from "./project-types";

const CONNECTOR_WORDS = new Set([
  "a",
  "an",
  "and",
  "as",
  "at",
  "by",
  "con",
  "de",
  "del",
  "el",
  "en",
  "for",
  "from",
  "la",
  "las",
  "los",
  "of",
  "on",
  "or",
  "para",
  "por",
  "que",
  "the",
  "to",
  "un",
  "una",
  "with",
  "y",
]);

export interface ComposedSubtitleLayout {
  lines: string[];
  maxWidth: number;
  bottomOffset: number;
  paddingX: number;
  paddingY: number;
  borderRadius: number;
  fontSize: number;
  lineHeight: number;
  letterSpacing: string;
  background: string;
  boxShadow: string;
  textShadow: string;
  backdropFilter: string;
  border: string;
  compactViewport: boolean;
}

export function clampNumber(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function normalizeSubtitleText(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function normalizeToken(word: string): string {
  return word.toLowerCase().replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
}

function scoreBalancedSplit(firstLine: string, secondLine: string, targetCharsPerLine: number): number {
  const firstWords = firstLine.split(" ");
  const secondWords = secondLine.split(" ");
  const firstLength = firstLine.length;
  const secondLength = secondLine.length;
  const firstLastWord = normalizeToken(firstWords[firstWords.length - 1] ?? "");
  const secondFirstWord = normalizeToken(secondWords[0] ?? "");

  let score = Math.abs(firstLength - secondLength) * 1.35;
  score += Math.max(0, firstLength - targetCharsPerLine) * 2.4;
  score += Math.max(0, secondLength - targetCharsPerLine) * 2.4;
  score += Math.max(firstLength, secondLength) * 0.1;

  if (firstWords.length === 1 || secondWords.length === 1) score += 20;
  if (firstLength < 10 || secondLength < 10) score += 10;
  if (CONNECTOR_WORDS.has(firstLastWord)) score += 8;
  if (CONNECTOR_WORDS.has(secondFirstWord)) score += 10;
  if (firstLastWord.length <= 2) score += 3;
  if (secondFirstWord.length <= 2) score += 5;
  if (/[,:;]$/.test(firstLine)) score -= 1.5;

  return score;
}

export function splitBalancedSubtitleLines(
  text: string,
  maxWidth: number,
  compactViewport: boolean,
): string[] {
  const normalized = normalizeSubtitleText(text);
  if (!normalized) return [];

  const words = normalized.split(" ");
  if (words.length <= 3) return [normalized];

  const targetCharsPerLine = Math.max(
    compactViewport ? 17 : 22,
    Math.floor(maxWidth / (compactViewport ? 9.2 : 10.6)),
  );
  const singleLineThreshold = compactViewport ? targetCharsPerLine - 2 : targetCharsPerLine;

  if (normalized.length <= singleLineThreshold && words.length <= (compactViewport ? 5 : 7)) {
    return [normalized];
  }

  let best: { score: number; lines: string[] } | null = null;

  for (let index = 1; index < words.length; index += 1) {
    const firstLine = words.slice(0, index).join(" ");
    const secondLine = words.slice(index).join(" ");
    const score = scoreBalancedSplit(firstLine, secondLine, targetCharsPerLine);

    if (!best || score < best.score) {
      best = { score, lines: [firstLine, secondLine] };
    }
  }

  return best?.lines ?? [normalized];
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const cleaned = hex.replace("#", "").trim();
  const normalized =
    cleaned.length === 3
      ? cleaned
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : cleaned;

  if (!/^[\da-fA-F]{6}$/.test(normalized)) {
    return { r: 0, g: 0, b: 0 };
  }

  const value = Number.parseInt(normalized, 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function buildSubtitleBackground(hex: string, opacity: number): string {
  const { r, g, b } = hexToRgb(hex);
  const baseOpacity = clampNumber(opacity, 0, 0.96);
  const topOpacity = clampNumber(baseOpacity * 0.84, 0, 0.96);
  const bottomOpacity = clampNumber(baseOpacity * 0.96, 0, 0.98);

  return `linear-gradient(180deg, rgba(${r}, ${g}, ${b}, ${topOpacity}) 0%, rgba(${r}, ${g}, ${b}, ${baseOpacity}) 55%, rgba(${r}, ${g}, ${b}, ${bottomOpacity}) 100%)`;
}

export function getComposedSubtitleLayout(
  style: SubtitleStyle,
  text: string,
  frameWidth: number,
  frameHeight: number,
): ComposedSubtitleLayout {
  const safeWidth = frameWidth > 0 ? frameWidth : 960;
  const safeHeight = frameHeight > 0 ? frameHeight : 540;
  const compactViewport = safeWidth < 640 || safeHeight < 360;
  const maxWidthRatio = compactViewport ? 0.88 : safeWidth < 960 ? 0.82 : 0.8;
  const maxAvailableWidth = Math.max(160, safeWidth - 24);
  const maxWidth = Math.round(
    clampNumber(safeWidth * maxWidthRatio, Math.min(220, maxAvailableWidth), maxAvailableWidth),
  );
  const lines = splitBalancedSubtitleLines(text, maxWidth, compactViewport);
  const normalizedText = normalizeSubtitleText(text);
  const lineCount = Math.max(lines.length, 1);

  const minFontSize = compactViewport ? 16 : 18;
  const maxFontSize = compactViewport ? 20 : safeWidth >= 1280 ? 30 : safeWidth >= 960 ? 28 : 26;
  const viewportBoost = compactViewport ? -2 : safeWidth >= 1180 ? 2 : safeWidth >= 860 ? 1 : 0;
  const lengthPenalty = Math.max(0, normalizedText.length - (compactViewport ? 26 : 38)) * (compactViewport ? 0.08 : 0.06);
  const linePenalty = lineCount === 2 ? (compactViewport ? 1.4 : 1.2) : 0;
  const fontSize = Math.round(
    clampNumber(style.fontSize + viewportBoost - lengthPenalty - linePenalty, minFontSize, maxFontSize),
  );

  return {
    lines,
    maxWidth,
    bottomOffset: compactViewport
      ? clampNumber(Math.round(safeHeight * 0.18), 42, 68)
      : clampNumber(Math.round(safeHeight * 0.15), 52, 88),
    paddingX: compactViewport
      ? clampNumber(Math.round(safeWidth * 0.042), 14, 20)
      : clampNumber(Math.round(safeWidth * 0.028), 18, 28),
    paddingY: compactViewport ? (lineCount === 2 ? 10 : 8) : lineCount === 2 ? 12 : 10,
    borderRadius: compactViewport ? 16 : 18,
    fontSize,
    lineHeight: lineCount === 2 ? 1.16 : 1.08,
    letterSpacing: lineCount === 1 ? "0.01em" : "0.005em",
    background: style.showBackground
      ? buildSubtitleBackground(style.backgroundColor, style.backgroundOpacity)
      : "transparent",
    boxShadow: style.showBackground
      ? compactViewport
        ? "0 8px 20px rgba(0, 0, 0, 0.26), 0 2px 8px rgba(0, 0, 0, 0.18)"
        : "0 12px 28px rgba(0, 0, 0, 0.28), 0 3px 12px rgba(0, 0, 0, 0.2)"
      : "none",
    textShadow: style.showBackground
      ? "0 1px 1px rgba(0, 0, 0, 0.92), 0 4px 14px rgba(0, 0, 0, 0.48)"
      : "0 1px 2px rgba(0, 0, 0, 0.96), 0 3px 12px rgba(0, 0, 0, 0.66), 0 0 24px rgba(0, 0, 0, 0.34)",
    backdropFilter: style.showBackground
      ? `blur(${compactViewport ? 10 : 12}px) saturate(145%)`
      : "none",
    border: style.showBackground ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid transparent",
    compactViewport,
  };
}
