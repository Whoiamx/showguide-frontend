export type SubtitleAnimationType = "none" | "fade" | "slide" | "typewriter";
export const subtitleToneOptions = ["neutral", "formal", "casual"] as const;
export type SubtitleTone = (typeof subtitleToneOptions)[number];

export interface SubtitleStyle {
  fontFamily: string;
  fontSize: number;
  textColor: string;
  backgroundColor: string;
  backgroundOpacity: number;
  showBackground: boolean;
  animation: SubtitleAnimationType;
}

export const defaultSubtitleStyle: SubtitleStyle = {
  fontFamily: "Arial",
  fontSize: 22,
  textColor: "#ffffff",
  backgroundColor: "#000000",
  backgroundOpacity: 0.62,
  showBackground: true,
  animation: "none",
};

export interface Marker {
  id: string;
  time: number;
  shape: "circle" | "square";
  color: string;
  label?: string;
}

export interface VideoEdits {
  trimStart: number | null;
  trimEnd: number | null;
  deletedSections: { start: number; end: number }[];
}

export const defaultVideoEdits: VideoEdits = {
  trimStart: null,
  trimEnd: null,
  deletedSections: [],
};

export interface SubtitleWord {
  word: string;
  startTime: number;
  endTime: number;
  index: number;
}

export type VoiceStatus = "idle" | "processing" | "completed" | "failed" | "stale";

export const planCodes = ["trial", "plus", "teams", "pro"] as const;
export type PlanCode = (typeof planCodes)[number];
